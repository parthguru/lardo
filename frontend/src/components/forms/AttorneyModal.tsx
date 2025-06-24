import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

// Reusing styled components from PatientModal for consistency
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--space-lg);
`;

const ModalContent = styled(motion.div)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: var(--space-2xl);
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  background: var(--color-white);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  z-index: 1;

  h2 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-blue-dark);
    margin: 0 0 var(--space-sm) 0;

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }

  p {
    color: var(--color-gray-700);
    margin: 0;
    font-size: var(--font-size-base);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-gray-500);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-700);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-xl);
  padding: 0 var(--space-lg);
`;

const ProgressStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: calc(-50% + 16px);
    left: calc(50% + 16px);
    height: 2px;
    background: ${props => props.completed ? 'var(--color-accent-green)' : 'var(--color-gray-300)'};
    transform: translateY(-50%);
    z-index: 0;
  }

  .step-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-sm);
    position: relative;
    z-index: 1;
    background: ${props => 
      props.completed ? 'var(--color-accent-green)' :
      props.active ? 'var(--color-primary-blue)' : 'var(--color-gray-300)'
    };
    color: var(--color-white);
  }

  .step-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: ${props => 
      props.active ? 'var(--color-primary-blue)' : 
      props.completed ? 'var(--color-accent-green)' : 'var(--color-gray-500)'
    };

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ModalBody = styled.div`
  padding: var(--space-2xl);
`;

const FormSection = styled.div`
  .form-title {
    font-size: var(--font-size-xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-lg);
    text-align: center;

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: var(--space-lg);

  &.two-column {
    grid-template-columns: 1fr 1fr;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-800);

    .required {
      color: var(--color-accent-orange);
      margin-left: var(--space-xs);
    }
  }

  input, select, textarea {
    padding: var(--space-md);
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--color-primary-blue);
      box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }

    &.error {
      border-color: var(--color-accent-orange);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .error-message {
    color: var(--color-accent-orange);
    font-size: var(--font-size-sm);
    margin-top: var(--space-xs);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: var(--space-lg);
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    cursor: pointer;
    font-weight: var(--font-weight-normal);

    input[type="radio"] {
      width: auto;
      margin: 0;
    }
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  gap: var(--space-sm);

  label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    cursor: pointer;
    font-weight: var(--font-weight-normal);
    line-height: var(--line-height-normal);

    input[type="checkbox"] {
      width: auto;
      margin: 0;
      margin-top: 2px;
    }
  }
`;

const ModalFooter = styled.div`
  padding: var(--space-xl) var(--space-2xl);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: var(--color-primary-blue);
          color: var(--color-white);
          border-color: var(--color-primary-blue);
          
          &:hover:not(:disabled) {
            background: var(--color-primary-blue-dark);
            border-color: var(--color-primary-blue-dark);
          }
        `;
      case 'danger':
        return `
          background: var(--color-accent-orange);
          color: var(--color-white);
          border-color: var(--color-accent-orange);
          
          &:hover:not(:disabled) {
            background: #e55a2b;
            border-color: #e55a2b;
          }
        `;
      default:
        return `
          background: var(--color-white);
          color: var(--color-primary-blue);
          border-color: var(--color-primary-blue);
          
          &:hover:not(:disabled) {
            background: var(--color-primary-blue-light);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.firmName.trim()) newErrors.firmName = t('forms.validation.required');
        if (!formData.attorneyName.trim()) newErrors.attorneyName = t('forms.validation.required');
        if (!formData.phone.trim()) newErrors.phone = t('forms.validation.required');
        else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) newErrors.phone = t('forms.validation.invalidPhone');
        if (!formData.email.trim()) newErrors.email = t('forms.validation.required');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('forms.validation.invalidEmail');
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = t('forms.validation.required');
        break;
      case 2:
        if (!formData.clientName.trim()) newErrors.clientName = t('forms.validation.required');
        if (!formData.clientPhone.trim()) newErrors.clientPhone = t('forms.validation.required');
        else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.clientPhone)) newErrors.clientPhone = t('forms.validation.invalidPhone');
        if (!formData.accidentDate) newErrors.accidentDate = t('forms.validation.required');
        break;
      case 3:
        if (formData.communicationPreferences.length === 0) newErrors.communicationPreferences = 'Please select at least one communication preference';
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
    { number: 1, label: 'Firm Info' },
    { number: 2, label: 'Client Info' },
    { number: 3, label: 'Coordination' }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection>
            <h3 className="form-title">{t('forms.attorney.step1.title')}</h3>
            
            <FormGroup>
              <label htmlFor="firmName">
                {t('forms.attorney.step1.firmName')}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firmName"
                value={formData.firmName}
                onChange={(e) => updateField('firmName', e.target.value)}
                className={errors.firmName ? 'error' : ''}
              />
              {errors.firmName && <span className="error-message">{errors.firmName}</span>}
            </FormGroup>

            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="attorneyName">
                  {t('forms.attorney.step1.attorneyName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="attorneyName"
                  value={formData.attorneyName}
                  onChange={(e) => updateField('attorneyName', e.target.value)}
                  className={errors.attorneyName ? 'error' : ''}
                />
                {errors.attorneyName && <span className="error-message">{errors.attorneyName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="licenseNumber">
                  {t('forms.attorney.step1.licenseNumber')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => updateField('licenseNumber', e.target.value)}
                  placeholder="TX Bar License Number"
                  className={errors.licenseNumber ? 'error' : ''}
                />
                {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">
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
                  {t('forms.attorney.step1.email')}
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
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
            <h3 className="form-title">{t('forms.attorney.step2.title')}</h3>
            
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="clientName">
                  {t('forms.attorney.step2.clientName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  className={errors.clientName ? 'error' : ''}
                />
                {errors.clientName && <span className="error-message">{errors.clientName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="clientPhone">
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
                <label htmlFor="caseNumber">{t('forms.attorney.step2.caseNumber')}</label>
                <input
                  type="text"
                  id="caseNumber"
                  value={formData.caseNumber}
                  onChange={(e) => updateField('caseNumber', e.target.value)}
                  placeholder="Internal case reference"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="accidentDate">
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
              <label>{t('forms.attorney.step2.documentation')}</label>
              <CheckboxGroup>
                {[
                  'Police Report',
                  'Insurance Claim',
                  'Medical Records',
                  'Witness Statements',
                  'Photos/Videos',
                  'Property Damage Estimate',
                  'Employment Records'
                ].map((doc) => (
                  <label key={doc}>
                    <input
                      type="checkbox"
                      checked={formData.documentation.includes(doc)}
                      onChange={(e) => handleArrayFieldChange('documentation', doc, e.target.checked)}
                    />
                    {doc}
                  </label>
                ))}
              </CheckboxGroup>
            </FormGroup>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <h3 className="form-title">{t('forms.attorney.step3.title')}</h3>
            
            <FormGroup>
              <label>{t('forms.attorney.step3.lopRequest')}</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="lopRequest"
                    value="yes"
                    checked={formData.lopRequest === 'yes'}
                    onChange={(e) => updateField('lopRequest', e.target.value)}
                  />
                  Yes, LOP requested
                </label>
                <label>
                  <input
                    type="radio"
                    name="lopRequest"
                    value="no"
                    checked={formData.lopRequest === 'no'}
                    onChange={(e) => updateField('lopRequest', e.target.value)}
                  />
                  No, client will pay directly
                </label>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <label>{t('forms.attorney.step3.reportingFrequency')}</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="weekly"
                    checked={formData.reportingFrequency === 'weekly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  Weekly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="biweekly"
                    checked={formData.reportingFrequency === 'biweekly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  Bi-weekly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="monthly"
                    checked={formData.reportingFrequency === 'monthly'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  Monthly updates
                </label>
                <label>
                  <input
                    type="radio"
                    name="reportingFrequency"
                    value="as-needed"
                    checked={formData.reportingFrequency === 'as-needed'}
                    onChange={(e) => updateField('reportingFrequency', e.target.value)}
                  />
                  As needed
                </label>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <label>
                {t('forms.attorney.step3.communicationPreferences')}
                <span className="required">*</span>
              </label>
              <CheckboxGroup>
                {[
                  'Email reports',
                  'Phone consultations', 
                  'Fax communications',
                  'Online portal access',
                  'Emergency contact availability',
                  'Direct physician communication'
                ].map((pref) => (
                  <label key={pref}>
                    <input
                      type="checkbox"
                      checked={formData.communicationPreferences.includes(pref)}
                      onChange={(e) => handleArrayFieldChange('communicationPreferences', pref, e.target.checked)}
                    />
                    {pref}
                  </label>
                ))}
              </CheckboxGroup>
              {errors.communicationPreferences && <span className="error-message">{errors.communicationPreferences}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="specialInstructions">{t('forms.attorney.step3.specialInstructions')}</label>
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