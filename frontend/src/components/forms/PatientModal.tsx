import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

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
  background: linear-gradient(135deg, #2c5aa0 0%, #3b82f6 100%);
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
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
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
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: #10b981;
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        `;
      } else if (props.active) {
        return `
          background: linear-gradient(135deg, #2c5aa0 0%, #3b82f6 100%);
          border-color: #2c5aa0;
          color: white;
          box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
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
      props.active ? '#2c5aa0' : 
      props.completed ? '#10b981' : '#64748b'
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
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
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
      border-color: #3b82f6;
      background: white;
      box-shadow: 
        0 0 0 4px rgba(59, 130, 246, 0.1),
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
      border-color: #3b82f6;
      background: #f0f9ff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    }

    input[type="radio"] {
      width: 20px;
      height: 20px;
      margin: 0;
      accent-color: #3b82f6;
    }

    &:has(input:checked) {
      border-color: #3b82f6;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      color: #1e40af;
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
      border-color: #10b981;
      background: #f0fdf4;
      transform: translateY(-1px);
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin: 0;
      margin-top: 2px;
      accent-color: #10b981;
    }

    &:has(input:checked) {
      border-color: #10b981;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      color: #065f46;
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
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
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
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

interface PatientModalProps {
  onClose: () => void;
}

interface FormData {
  // Step 1: Contact Information
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  
  // Step 2: Accident Details
  accidentDate: string;
  accidentTime: string;
  location: string;
  circumstances: string;
  vehicleInfo: string;
  damageDescription: string;
  policeReport: string;
  insurance: string;
  
  // Step 3: Injury Assessment
  painLocation: string[];
  symptoms: string;
  medicalHistory: string;
  treatmentPreferences: string;
  hasAttorney: string;
  attorneyName: string;
  attorneyPhone: string;
}

const PatientModal: React.FC<PatientModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { currentStep, nextStep, previousStep, isFirstStep, isLastStep } = useMultiStepForm(3);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferredLanguage: 'english',
    accidentDate: '',
    accidentTime: '',
    location: '',
    circumstances: '',
    vehicleInfo: '',
    damageDescription: '',
    policeReport: '',
    insurance: '',
    painLocation: [],
    symptoms: '',
    medicalHistory: '',
    treatmentPreferences: '',
    hasAttorney: 'no',
    attorneyName: '',
    attorneyPhone: ''
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

  const updateField = (field: keyof FormData, value: string | string[]) => {
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
        case 'attorneyPhone':
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
        case 'firstName':
        case 'lastName':
        case 'attorneyName':
          if (value.trim() && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) {
            newErrors[field] = 'Please enter a valid name (letters only)';
          } else {
            delete newErrors[field];
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
        // Name validations with specific checks
        if (!formData.firstName.trim()) {
          newErrors.firstName = t('forms.validation.required');
        } else if (formData.firstName.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(formData.firstName.trim())) {
          newErrors.firstName = 'Please enter a valid first name';
        }

        if (!formData.lastName.trim()) {
          newErrors.lastName = t('forms.validation.required');
        } else if (formData.lastName.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(formData.lastName.trim())) {
          newErrors.lastName = 'Please enter a valid last name';
        }

        // Phone validation with specific format check
        if (!formData.phone.trim()) {
          newErrors.phone = t('forms.validation.required');
        } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number: (956) 123-4567';
        }

        // Email validation (optional but must be valid if provided)
        if (formData.email && formData.email.trim()) {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
          }
        }

        // Language selection validation
        if (!formData.preferredLanguage) {
          newErrors.preferredLanguage = 'Please select your preferred language';
        }
        break;

      case 2:
        // Date validation
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

        // Location validation
        if (!formData.location.trim()) {
          newErrors.location = t('forms.validation.required');
        } else if (formData.location.trim().length < 5) {
          newErrors.location = 'Please provide a more detailed location (at least 5 characters)';
        }

        // Circumstances validation
        if (!formData.circumstances.trim()) {
          newErrors.circumstances = t('forms.validation.required');
        } else if (formData.circumstances.trim().length < 10) {
          newErrors.circumstances = 'Please provide more details about the accident (at least 10 characters)';
        }

        // Vehicle info validation (if provided)
        if (formData.vehicleInfo && formData.vehicleInfo.trim() && formData.vehicleInfo.trim().length < 3) {
          newErrors.vehicleInfo = 'Please provide valid vehicle information';
        }
        break;

      case 3:
        // Pain location validation
        if (formData.painLocation.length === 0) {
          newErrors.painLocation = 'Please select at least one area where you experienced pain or injury';
        }

        // Symptoms validation
        if (!formData.symptoms.trim()) {
          newErrors.symptoms = t('forms.validation.required');
        } else if (formData.symptoms.trim().length < 5) {
          newErrors.symptoms = 'Please provide more detail about your symptoms (at least 5 characters)';
        }

        // Attorney information validation (if they have one)
        if (formData.hasAttorney === 'yes') {
          if (!formData.attorneyName.trim()) {
            newErrors.attorneyName = 'Attorney name is required';
          } else if (formData.attorneyName.trim().length < 2) {
            newErrors.attorneyName = 'Please enter a valid attorney name';
          }

          if (!formData.attorneyPhone.trim()) {
            newErrors.attorneyPhone = 'Attorney phone number is required';
          } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.attorneyPhone)) {
            newErrors.attorneyPhone = 'Please enter a valid phone number: (956) 123-4567';
          }
        }

        // Has attorney selection validation
        if (!formData.hasAttorney) {
          newErrors.hasAttorney = 'Please indicate if you have an attorney';
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
      console.log('Form submitted:', formData);
      
      // Show success message and close modal
      alert('Form submitted successfully! We will contact you within 24 hours.');
      onClose();
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePainLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      updateField('painLocation', [...formData.painLocation, location]);
    } else {
      updateField('painLocation', formData.painLocation.filter(l => l !== location));
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
    { number: 1, label: 'Contact' },
    { number: 2, label: 'Accident' },
    { number: 3, label: 'Assessment' }
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
              👤 {t('forms.patient.step1.title')}
            </h3>
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="firstName">
                  <span className="icon">👤</span>
                  {t('forms.patient.step1.firstName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="lastName">
                  <span className="icon">👤</span>
                  {t('forms.patient.step1.lastName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">
                  <span className="icon">📞</span>
                  {t('forms.patient.step1.phone')}
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
                  {t('forms.patient.step1.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your.email@example.com (optional)"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <label>
                <span className="icon">🌍</span>
                {t('forms.patient.step1.preferredLanguage')}
              </label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="english"
                    checked={formData.preferredLanguage === 'english'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  🇺🇸 {t('forms.patient.step1.languages.english')}
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="spanish"
                    checked={formData.preferredLanguage === 'spanish'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  🇲🇽 {t('forms.patient.step1.languages.spanish')}
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="both"
                    checked={formData.preferredLanguage === 'both'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  🌎 {t('forms.patient.step1.languages.both')}
                </label>
              </RadioGroup>
            </FormGroup>
          </FormSection>
        );

      case 2:
        return (
          <FormSection>
            <h3 className="form-title">
              🚗 {t('forms.patient.step2.title')}
            </h3>
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="accidentDate">
                  <span className="icon">📅</span>
                  {t('forms.patient.step2.accidentDate')}
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

              <FormGroup>
                <label htmlFor="accidentTime">
                  <span className="icon">⏰</span>
                  {t('forms.patient.step2.accidentTime')}
                </label>
                <input
                  type="time"
                  id="accidentTime"
                  value={formData.accidentTime}
                  onChange={(e) => updateField('accidentTime', e.target.value)}
                />
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <label htmlFor="location">
                <span className="icon">📍</span>
                {t('forms.patient.step2.location')}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Street address, intersection, or landmark in Laredo"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="circumstances">
                <span className="icon">📝</span>
                {t('forms.patient.step2.circumstances')}
                <span className="required">*</span>
              </label>
              <textarea
                id="circumstances"
                value={formData.circumstances}
                onChange={(e) => updateField('circumstances', e.target.value)}
                placeholder="Please describe what happened during the accident in detail..."
                className={errors.circumstances ? 'error' : ''}
              />
              {errors.circumstances && <span className="error-message">{errors.circumstances}</span>}
            </FormGroup>

            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="vehicleInfo">
                  <span className="icon">🚙</span>
                  {t('forms.patient.step2.vehicleInfo')}
                </label>
                <input
                  type="text"
                  id="vehicleInfo"
                  value={formData.vehicleInfo}
                  onChange={(e) => updateField('vehicleInfo', e.target.value)}
                  placeholder="2020 Honda Civic, etc."
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="policeReport">
                  <span className="icon">👮‍♂️</span>
                  {t('forms.patient.step2.policeReport')}
                </label>
                <input
                  type="text"
                  id="policeReport"
                  value={formData.policeReport}
                  onChange={(e) => updateField('policeReport', e.target.value)}
                  placeholder="Report number (if available)"
                />
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <label htmlFor="insurance">
                <span className="icon">🛡️</span>
                {t('forms.patient.step2.insurance')}
              </label>
              <textarea
                id="insurance"
                value={formData.insurance}
                onChange={(e) => updateField('insurance', e.target.value)}
                placeholder="Insurance company name, policy number, claim number (if available)"
              />
            </FormGroup>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <h3 className="form-title">
              🏥 {t('forms.patient.step3.title')}
            </h3>
            
            <FormGroup>
              <label>
                <span className="icon">📍</span>
                {t('forms.patient.step3.painLocation')}
                <span className="required">*</span>
              </label>
              <CheckboxGroup>
                {[
                  { value: 'Neck', icon: '🗽' },
                  { value: 'Upper Back', icon: '⬆️' },
                  { value: 'Lower Back', icon: '⬇️' },
                  { value: 'Shoulders', icon: '💪' },
                  { value: 'Arms', icon: '🦾' },
                  { value: 'Legs', icon: '🦵' },
                  { value: 'Head', icon: '🧠' },
                  { value: 'Chest', icon: '🫁' },
                  { value: 'Other', icon: '🔍' }
                ].map((location) => (
                  <label key={location.value}>
                    <input
                      type="checkbox"
                      checked={formData.painLocation.includes(location.value)}
                      onChange={(e) => handlePainLocationChange(location.value, e.target.checked)}
                    />
                    {location.icon} {location.value}
                  </label>
                ))}
              </CheckboxGroup>
              {errors.painLocation && <span className="error-message">{errors.painLocation}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="symptoms">
                <span className="icon">🩺</span>
                {t('forms.patient.step3.symptoms')}
                <span className="required">*</span>
              </label>
              <textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => updateField('symptoms', e.target.value)}
                placeholder="Please describe your pain level, stiffness, numbness, headaches, or any other symptoms you're experiencing..."
                className={errors.symptoms ? 'error' : ''}
              />
              {errors.symptoms && <span className="error-message">{errors.symptoms}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="medicalHistory">
                <span className="icon">📋</span>
                {t('forms.patient.step3.medicalHistory')}
              </label>
              <textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => updateField('medicalHistory', e.target.value)}
                placeholder="Previous injuries, surgeries, current medications, allergies, or other relevant medical history..."
              />
            </FormGroup>

            <FormGroup>
              <label>
                <span className="icon">⚖️</span>
                {t('forms.patient.step3.hasAttorney')}
              </label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="hasAttorney"
                    value="no"
                    checked={formData.hasAttorney === 'no'}
                    onChange={(e) => updateField('hasAttorney', e.target.value)}
                  />
                  ❌ No, I don't have an attorney
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasAttorney"
                    value="yes"
                    checked={formData.hasAttorney === 'yes'}
                    onChange={(e) => updateField('hasAttorney', e.target.value)}
                  />
                  ✅ Yes, I have legal representation
                </label>
              </RadioGroup>
            </FormGroup>

            {formData.hasAttorney === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormGrid className="two-column">
                  <FormGroup>
                    <label htmlFor="attorneyName">
                      <span className="icon">👨‍💼</span>
                      {t('forms.patient.step3.attorneyName')}
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
                    <label htmlFor="attorneyPhone">
                      <span className="icon">📞</span>
                      {t('forms.patient.step3.attorneyPhone')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="attorneyPhone"
                      value={formData.attorneyPhone}
                      onChange={(e) => updateField('attorneyPhone', formatPhoneNumber(e.target.value))}
                      placeholder="(956) 123-4567"
                      className={errors.attorneyPhone ? 'error' : ''}
                    />
                    {errors.attorneyPhone && <span className="error-message">{errors.attorneyPhone}</span>}
                  </FormGroup>
                </FormGrid>
              </motion.div>
            )}
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
            <h2>{t('forms.patient.title')}</h2>
            <p>{t('forms.patient.subtitle')}</p>
            <CloseButton onClick={onClose} aria-label="Close modal">
              ×
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <ProgressBar>
              <ProgressTrack />
              <ProgressFill 
                progress={getStepProgress()}
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <ProgressSteps>
                {steps.map((step) => (
                  <ProgressStep
                    key={step.number}
                    active={currentStep === step.number}
                    completed={currentStep > step.number}
                  >
                    <motion.div 
                      className="step-circle"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentStep > step.number ? '✓' : step.number}
                    </motion.div>
                    <div className="step-label">{step.label}</div>
                  </ProgressStep>
                ))}
              </ProgressSteps>
            </ProgressBar>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </ModalBody>

          <ModalFooter>
            <div>
              {!isFirstStep && (
                <Button variant="secondary" onClick={previousStep}>
                  ← {t('forms.buttons.previous')}
                </Button>
              )}
            </div>
            <ButtonGroup>
              <Button onClick={onClose}>
                ✕ {t('forms.buttons.cancel')}
              </Button>
              {isLastStep ? (
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'inline-block', marginRight: '8px' }}
                      >
                        ⏳
                      </motion.span>
                      Submitting...
                    </>
                  ) : (
                    <>📤 {t('forms.buttons.submit')}</>
                  )}
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  {t('forms.buttons.next')} →
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default PatientModal;