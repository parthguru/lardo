import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

// Reusing modern styled components from PatientModal for consistency
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 20, 40, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--space-lg);
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-height: 95vh;
    margin: var(--space-sm);
    max-width: calc(100vw - var(--space-lg));
    border-radius: 20px;
  }
`;

const ModalHeader = styled.div`
  padding: var(--space-2xl) var(--space-2xl) var(--space-xl);
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.3;
  }

  h2 {
    font-size: clamp(var(--font-size-xl), 4vw, var(--font-size-3xl));
    color: white;
    margin: 0 0 var(--space-sm) 0;
    font-weight: var(--font-weight-bold);
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: var(--font-size-base);
    position: relative;
    z-index: 1;
    line-height: var(--line-height-relaxed);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  margin: var(--space-xl) var(--space-2xl) var(--space-2xl);
  position: relative;
`;

const ProgressTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 0;
`;

const ProgressFill = styled(motion.div)<{ progress: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%);
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 1;
  width: ${props => props.progress}%;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 2;
`;

const ProgressStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);

  .step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-base);
    transition: all var(--transition-fast);
    border: 3px solid;
    position: relative;
    
    ${props => {
      if (props.completed) {
        return `
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-color: #7c3aed;
          color: white;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        `;
      } else if (props.active) {
        return `
          background: linear-gradient(135deg, #a855f7 0%, #c084fc 100%);
          border-color: #a855f7;
          color: white;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
        `;
      } else {
        return `
          background: white;
          border-color: #e2e8f0;
          color: #64748b;
        `;
      }
    }}
  }

  .step-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    transition: color var(--transition-fast);
    
    color: ${props => 
      props.active ? '#7c3aed' : 
      props.completed ? '#a855f7' : '#64748b'
    };

    @media (max-width: 640px) {
      font-size: var(--font-size-xs);
    }
  }
`;

const ModalBody = styled.div`
  padding: 0 var(--space-2xl) var(--space-xl);
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 0 var(--space-lg) var(--space-lg);
  }
`;

const FormSection = styled.div`
  margin-bottom: var(--space-2xl);
  
  .form-title {
    font-size: clamp(var(--font-size-lg), 3vw, var(--font-size-2xl));
    background: linear-gradient(135deg, #581c87 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-2xl);
    text-align: center;
    font-weight: var(--font-weight-bold);
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);

  &.two-column {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--space-xl);
    }
  }

  &.three-column {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);

  label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: #374151;
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    .required {
      color: #ef4444;
      font-size: var(--font-size-lg);
    }

    .icon {
      font-size: var(--font-size-lg);
      opacity: 0.7;
    }
  }

  input, select, textarea {
    padding: var(--space-md) var(--space-lg);
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: var(--font-size-base);
    transition: all var(--transition-fast);
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
      border-color: #7c3aed;
      background: white;
      box-shadow: 
        0 0 0 4px rgba(124, 58, 237, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
    line-height: var(--line-height-relaxed);
  }

  .error-message {
    color: #ef4444;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    margin-top: var(--space-xs);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    background: #fef2f2;
    padding: var(--space-sm) var(--space-md);
    border-radius: 8px;
    border-left: 4px solid #ef4444;
    animation: shake 0.5s ease-in-out;

    &::before {
      content: '⚠️';
      font-size: var(--font-size-sm);
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  .success-message {
    color: #059669;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    margin-top: var(--space-xs);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    background: #f0fdf4;
    padding: var(--space-sm) var(--space-md);
    border-radius: 8px;
    border-left: 4px solid #059669;

    &::before {
      content: '✅';
      font-size: var(--font-size-sm);
    }
  }
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-sm);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  label {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    padding: var(--space-md);
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    transition: all var(--transition-fast);
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);

    &:hover {
      border-color: #7c3aed;
      background: #faf5ff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
    }

    input[type="radio"] {
      width: 20px;
      height: 20px;
      margin: 0;
      accent-color: #7c3aed;
    }

    &:has(input:checked) {
      border-color: #7c3aed;
      background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
      color: #581c87;
      font-weight: var(--font-weight-semibold);
    }
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-sm);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-normal);
    padding: var(--space-sm) var(--space-md);
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    transition: all var(--transition-fast);
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);

    &:hover {
      border-color: #7c3aed;
      background: #faf5ff;
      transform: translateY(-1px);
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin: 0;
      margin-top: 2px;
      accent-color: #7c3aed;
    }

    &:has(input:checked) {
      border-color: #7c3aed;
      background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
      color: #581c87;
    }
  }
`;

const ModalFooter = styled.div`
  padding: var(--space-xl) var(--space-2xl);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: var(--space-lg);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-md);

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: var(--space-md) var(--space-xl);
  border-radius: 12px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid;
  min-width: 120px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #6d28d9 0%, #9333ea 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
          }
        `;
      default:
        return `
          background: white;
          color: #374151;
          border-color: #d1d5db;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          
          &:hover:not(:disabled) {
            background: #f9fafb;
            border-color: #9ca3af;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &:focus {
    outline: 2px solid #7c3aed;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

interface AttorneyModalProps {
  onClose: () => void;
}

interface AttorneyFormData {
  // Step 1: Law Firm Information
  firmName: string;
  attorneyName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  
  // Step 2: Client Information
  clientName: string;
  clientPhone: string;
  caseNumber: string;
  accidentDate: string;
  documentation: string[];
  
  // Step 3: Coordination Preferences
  lopRequest: string;
  reportingFrequency: string;
  communicationPreferences: string[];
  specialInstructions: string;
}

const AttorneyModal: React.FC<AttorneyModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep } = useMultiStepForm(3);
  
  const [formData, setFormData] = useState<AttorneyFormData>({
    firmName: '',
    attorneyName: '',
    phone: '',
    email: '',
    licenseNumber: '',
    clientName: '',
    clientPhone: '',
    caseNumber: '',
    accidentDate: '',
    documentation: [],
    lopRequest: 'yes',
    reportingFrequency: 'weekly',
    communicationPreferences: [],
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const updateField = (field: keyof AttorneyFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error immediately when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Real-time validation for certain fields
    if (typeof value === 'string' && value.trim()) {
      const newErrors: Record<string, string> = { ...errors };
      
      switch (field) {
        case 'email':
          if (value.trim() && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
            newErrors[field] = 'Please enter a valid email address';
          } else {
            delete newErrors[field];
          }
          break;
        case 'phone':
        case 'clientPhone':
          if (value.trim() && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
            // Only show error if they've typed enough characters
            if (value.replace(/\D/g, '').length >= 10) {
              newErrors[field] = 'Please enter a valid phone number: (956) 123-4567';
            } else {
              delete newErrors[field];
            }
          } else {
            delete newErrors[field];
          }
          break;
        case 'attorneyName':
        case 'clientName':
          if (value.trim() && !/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(value.trim())) {
            newErrors[field] = 'Please enter a valid name (letters only)';
          } else {
            delete newErrors[field];
          }
          break;
        case 'licenseNumber':
          if (value.trim()) {
            const digits = value.replace(/\D/g, '');
            if (digits.length > 0 && digits.length !== 8) {
              newErrors[field] = 'Texas State Bar license number should be 8 digits';
            } else {
              delete newErrors[field];
            }
          }
          break;
      }
      
      setErrors(newErrors);
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        // Law firm name validation
        if (!formData.firmName.trim()) {
          newErrors.firmName = t('forms.validation.required');
        } else if (formData.firmName.trim().length < 3) {
          newErrors.firmName = 'Law firm name must be at least 3 characters';
        }

        // Attorney name validation
        if (!formData.attorneyName.trim()) {
          newErrors.attorneyName = t('forms.validation.required');
        } else if (formData.attorneyName.trim().length < 2) {
          newErrors.attorneyName = 'Attorney name must be at least 2 characters';
        } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(formData.attorneyName.trim())) {
          newErrors.attorneyName = 'Please enter a valid attorney name';
        }

        // Phone validation
        if (!formData.phone.trim()) {
          newErrors.phone = t('forms.validation.required');
        } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number: (956) 123-4567';
        }

        // Email validation
        if (!formData.email.trim()) {
          newErrors.email = t('forms.validation.required');
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address';
        }

        // License number validation
        if (!formData.licenseNumber.trim()) {
          newErrors.licenseNumber = t('forms.validation.required');
        } else if (!/^\d{8}$/.test(formData.licenseNumber.replace(/\D/g, ''))) {
          newErrors.licenseNumber = 'Texas State Bar license number should be 8 digits';
        }
        break;

      case 2:
        // Client name validation
        if (!formData.clientName.trim()) {
          newErrors.clientName = t('forms.validation.required');
        } else if (formData.clientName.trim().length < 2) {
          newErrors.clientName = 'Client name must be at least 2 characters';
        } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(formData.clientName.trim())) {
          newErrors.clientName = 'Please enter a valid client name';
        }

        // Client phone validation
        if (!formData.clientPhone.trim()) {
          newErrors.clientPhone = t('forms.validation.required');
        } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.clientPhone)) {
          newErrors.clientPhone = 'Please enter a valid phone number: (956) 123-4567';
        }

        // Accident date validation
        if (!formData.accidentDate) {
          newErrors.accidentDate = t('forms.validation.required');
        } else {
          const accidentDate = new Date(formData.accidentDate);
          const today = new Date();
          const maxDate = new Date();
          maxDate.setFullYear(today.getFullYear() - 10); // Not more than 10 years ago

          if (accidentDate > today) {
            newErrors.accidentDate = 'Accident date cannot be in the future';
          } else if (accidentDate < maxDate) {
            newErrors.accidentDate = 'Please contact us directly for accidents older than 10 years';
          }
        }

        // Case number validation (if provided)
        if (formData.caseNumber && formData.caseNumber.trim() && formData.caseNumber.trim().length < 3) {
          newErrors.caseNumber = 'Please provide a valid case number';
        }
        break;

      case 3:
        // Communication preferences validation
        if (formData.communicationPreferences.length === 0) {
          newErrors.communicationPreferences = 'Please select at least one communication preference';
        }

        // LOP request validation
        if (!formData.lopRequest) {
          newErrors.lopRequest = 'Please indicate if you are requesting LOP (Letter of Protection)';
        }

        // Reporting frequency validation
        if (!formData.reportingFrequency) {
          newErrors.reportingFrequency = 'Please select your preferred reporting frequency';
        }

        // Special instructions validation (if provided)
        if (formData.specialInstructions && formData.specialInstructions.trim() && formData.specialInstructions.trim().length < 5) {
          newErrors.specialInstructions = 'Please provide more detailed instructions (at least 5 characters)';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log('Attorney form submitted:', formData);
      
      // Show success message and close modal
      alert('Attorney referral form submitted successfully! We will contact you within 24 hours to coordinate care.');
      onClose();
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleArrayFieldChange = (field: 'documentation' | 'communicationPreferences', value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      updateField(field, [...currentArray, value]);
    } else {
      updateField(field, currentArray.filter(item => item !== value));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const steps = [
    { number: 1, label: 'Law Firm' },
    { number: 2, label: 'Client Info' },
    { number: 3, label: 'Preferences' }
  ];

  const getStepProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection>
            <h3 className="form-title">
              ⚖️ {t('forms.attorney.step1.title')}
            </h3>
            
            <FormGroup>
              <label htmlFor="firmName">
                <span className="icon">🏢</span>
                {t('forms.attorney.step1.firmName')}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firmName"
                value={formData.firmName}
                onChange={(e) => updateField('firmName', e.target.value)}
                placeholder="Enter your law firm name"
                className={errors.firmName ? 'error' : ''}
              />
              {errors.firmName && <span className="error-message">{errors.firmName}</span>}
            </FormGroup>

            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="attorneyName">
                  <span className="icon">👨‍💼</span>
                  {t('forms.attorney.step1.attorneyName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="attorneyName"
                  value={formData.attorneyName}
                  onChange={(e) => updateField('attorneyName', e.target.value)}
                  placeholder="Attorney's full name"
                  className={errors.attorneyName ? 'error' : ''}
                />
                {errors.attorneyName && <span className="error-message">{errors.attorneyName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="licenseNumber">
                  <span className="icon">🆔</span>
                  {t('forms.attorney.step1.licenseNumber')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => {
                    // Format license number to only allow digits
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                    updateField('licenseNumber', digits);
                  }}
                  placeholder="12345678 (8 digits)"
                  maxLength={8}
                  className={errors.licenseNumber ? 'error' : ''}
                />
                {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">
                  <span className="icon">📞</span>
                  {t('forms.attorney.step1.phone')}
                  <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', formatPhoneNumber(e.target.value))}
                  placeholder="(956) 123-4567"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">
                  <span className="icon">✉️</span>
                  {t('forms.attorney.step1.email')}
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="attorney@lawfirm.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </FormGroup>
            </FormGrid>
          </FormSection>
        );

      case 2:
        return (
          <FormSection>
            <h3 className="form-title">
              👥 {t('forms.attorney.step2.title')}
            </h3>
            
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="clientName">
                  <span className="icon">👤</span>
                  {t('forms.attorney.step2.clientName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  placeholder="Client's full name"
                  className={errors.clientName ? 'error' : ''}
                />
                {errors.clientName && <span className="error-message">{errors.clientName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="clientPhone">
                  <span className="icon">📱</span>
                  {t('forms.attorney.step2.clientPhone')}
                  <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="clientPhone"
                  value={formData.clientPhone}
                  onChange={(e) => updateField('clientPhone', formatPhoneNumber(e.target.value))}
                  placeholder="(956) 123-4567"
                  className={errors.clientPhone ? 'error' : ''}
                />
                {errors.clientPhone && <span className="error-message">{errors.clientPhone}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="caseNumber">
                  <span className="icon">📋</span>
                  {t('forms.attorney.step2.caseNumber')}
                </label>
                <input
                  type="text"
                  id="caseNumber"
                  value={formData.caseNumber}
                  onChange={(e) => updateField('caseNumber', e.target.value)}
                  placeholder="Internal case reference number"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="accidentDate">
                  <span className="icon">📅</span>
                  {t('forms.attorney.step2.accidentDate')}
                  <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="accidentDate"
                  value={formData.accidentDate}
                  onChange={(e) => updateField('accidentDate', e.target.value)}
                  className={errors.accidentDate ? 'error' : ''}
                />
                {errors.accidentDate && <span className="error-message">{errors.accidentDate}</span>}
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <label>
                <span className="icon">📄</span>
                {t('forms.attorney.step2.documentation')}
              </label>
              <CheckboxGroup>
                {[
                  { value: 'Police Report', icon: '👮‍♂️' },
                  { value: 'Insurance Claim', icon: '🛡️' },
                  { value: 'Medical Records', icon: '🏥' },
                  { value: 'Witness Statements', icon: '👥' },
                  { value: 'Photos/Videos', icon: '📸' },
                  { value: 'Property Damage Estimate', icon: '🚗' },
                  { value: 'Employment Records', icon: '💼' }
                ].map((doc) => (
                  <label key={doc.value}>
                    <input
                      type="checkbox"
                      checked={formData.documentation.includes(doc.value)}
                      onChange={(e) => handleArrayFieldChange('documentation', doc.value, e.target.checked)}
                    />
                    {doc.icon} {doc.value}
                  </label>
                ))}
              </CheckboxGroup>
            </FormGroup>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <h3 className="form-title">
              🎯 {t('forms.attorney.step3.title')}
            </h3>
            
            <FormGroup>
              <label>
                <span className="icon">💰</span>
                {t('forms.attorney.step3.lopRequest')}
              </label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="lopRequest"
                    value="yes"
                    checked={formData.lopRequest === 'yes'}
                    onChange={(e) => updateField('lopRequest', e.target.value)}
                  />
                  ✅ Yes, LOP requested
                </label>
                <label>
                  <input
                    type="radio"
                    name="lopRequest"
                    value="no"
                    checked={formData.lopRequest === 'no'}
                    onChange={(e) => updateField('lopRequest', e.target.value)}
                  />
                  💳 No, client will pay directly
                </label>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <label>
                <span className="icon">📊</span>
                {t('forms.attorney.step3.reportingFrequency')}
              </label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="weekly"
                    checked={formData.reportingFrequency === 'weekly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  🗓️ Weekly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="biweekly"
                    checked={formData.reportingFrequency === 'biweekly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  📅 Bi-weekly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="monthly"
                    checked={formData.reportingFrequency === 'monthly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  🗓️ Monthly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="as-needed"
                    checked={formData.reportingFrequency === 'as-needed'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  📞 As needed
                </label>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <label>
                <span className="icon">📞</span>
                {t('forms.attorney.step3.communicationPreferences')}
                <span className="required">*</span>
              </label>
              <CheckboxGroup>
                {[
                  { value: 'Email reports', icon: '📧' },
                  { value: 'Phone consultations', icon: '📱' },
                  { value: 'Fax communications', icon: '📠' },
                  { value: 'Online portal access', icon: '💻' },
                  { value: 'Emergency contact availability', icon: '🚨' },
                  { value: 'Direct physician communication', icon: '👨‍⚕️' }
                ].map((pref) => (
                  <label key={pref.value}>
                    <input
                      type="checkbox"
                      checked={formData.communicationPreferences.includes(pref.value)}
                      onChange={(e) => handleArrayFieldChange('communicationPreferences', pref.value, e.target.checked)}
                    />
                    {pref.icon} {pref.value}
                  </label>
                ))}
              </CheckboxGroup>
              {errors.communicationPreferences && <span className="error-message">{errors.communicationPreferences}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="specialInstructions">
                <span className="icon">📝</span>
                {t('forms.attorney.step3.specialInstructions')}
              </label>
              <textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => updateField('specialInstructions', e.target.value)}
                placeholder="Any specific requirements, deadlines, or considerations for this case..."
              />
            </FormGroup>
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader>
            <h2>{t('forms.attorney.title')}</h2>
            <p>{t('forms.attorney.subtitle')}</p>
            <CloseButton onClick={onClose} aria-label="Close modal">
              ×
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <ProgressBar>
              {steps.map((step) => (
                <ProgressStep
                  key={step.number}
                  active={currentStep === step.number}
                  completed={currentStep > step.number}
                >
                  <div className="step-circle">
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <div className="step-label">{step.label}</div>
                </ProgressStep>
              ))}
            </ProgressBar>

            {renderStep()}
          </ModalBody>

          <ModalFooter>
            <div>
              {!isFirstStep && (
                <Button variant="secondary" onClick={previousStep}>
                  {t('forms.buttons.previous')}
                </Button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
              <Button onClick={onClose}>
                {t('forms.buttons.cancel')}
              </Button>
              {isLastStep ? (
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : t('forms.buttons.submit')}
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  {t('forms.buttons.next')}
                </Button>
              )}
            </div>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default AttorneyModal;