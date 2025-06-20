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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = t('forms.validation.required');
        if (!formData.lastName.trim()) newErrors.lastName = t('forms.validation.required');
        if (!formData.phone.trim()) newErrors.phone = t('forms.validation.required');
        else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) newErrors.phone = t('forms.validation.invalidPhone');
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('forms.validation.invalidEmail');
        break;
      case 2:
        if (!formData.accidentDate) newErrors.accidentDate = t('forms.validation.required');
        if (!formData.location.trim()) newErrors.location = t('forms.validation.required');
        if (!formData.circumstances.trim()) newErrors.circumstances = t('forms.validation.required');
        break;
      case 3:
        if (formData.painLocation.length === 0) newErrors.painLocation = t('forms.validation.required');
        if (!formData.symptoms.trim()) newErrors.symptoms = t('forms.validation.required');
        if (formData.hasAttorney === 'yes') {
          if (!formData.attorneyName.trim()) newErrors.attorneyName = t('forms.validation.required');
          if (!formData.attorneyPhone.trim()) newErrors.attorneyPhone = t('forms.validation.required');
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection>
            <h3 className="form-title">{t('forms.patient.step1.title')}</h3>
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="firstName">
                  {t('forms.patient.step1.firstName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="lastName">
                  {t('forms.patient.step1.lastName')}
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">
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
                <label htmlFor="email">{t('forms.patient.step1.email')}</label>
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

            <FormGroup>
              <label>{t('forms.patient.step1.preferredLanguage')}</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="english"
                    checked={formData.preferredLanguage === 'english'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  {t('forms.patient.step1.languages.english')}
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="spanish"
                    checked={formData.preferredLanguage === 'spanish'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  {t('forms.patient.step1.languages.spanish')}
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value="both"
                    checked={formData.preferredLanguage === 'both'}
                    onChange={(e) => updateField('preferredLanguage', e.target.value)}
                  />
                  {t('forms.patient.step1.languages.both')}
                </label>
              </RadioGroup>
            </FormGroup>
          </FormSection>
        );

      case 2:
        return (
          <FormSection>
            <h3 className="form-title">{t('forms.patient.step2.title')}</h3>
            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="accidentDate">
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
                <label htmlFor="accidentTime">{t('forms.patient.step2.accidentTime')}</label>
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
                {t('forms.patient.step2.location')}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Street address, intersection, or landmark"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="circumstances">
                {t('forms.patient.step2.circumstances')}
                <span className="required">*</span>
              </label>
              <textarea
                id="circumstances"
                value={formData.circumstances}
                onChange={(e) => updateField('circumstances', e.target.value)}
                placeholder="Describe what happened..."
                className={errors.circumstances ? 'error' : ''}
              />
              {errors.circumstances && <span className="error-message">{errors.circumstances}</span>}
            </FormGroup>

            <FormGrid className="two-column">
              <FormGroup>
                <label htmlFor="vehicleInfo">{t('forms.patient.step2.vehicleInfo')}</label>
                <input
                  type="text"
                  id="vehicleInfo"
                  value={formData.vehicleInfo}
                  onChange={(e) => updateField('vehicleInfo', e.target.value)}
                  placeholder="Year, Make, Model"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="policeReport">{t('forms.patient.step2.policeReport')}</label>
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
              <label htmlFor="insurance">{t('forms.patient.step2.insurance')}</label>
              <textarea
                id="insurance"
                value={formData.insurance}
                onChange={(e) => updateField('insurance', e.target.value)}
                placeholder="Insurance company, policy number, claim number"
              />
            </FormGroup>
          </FormSection>
        );

      case 3:
        return (
          <FormSection>
            <h3 className="form-title">{t('forms.patient.step3.title')}</h3>
            
            <FormGroup>
              <label>
                {t('forms.patient.step3.painLocation')}
                <span className="required">*</span>
              </label>
              <CheckboxGroup>
                {['Neck', 'Upper Back', 'Lower Back', 'Shoulders', 'Arms', 'Legs', 'Head', 'Chest', 'Other'].map((location) => (
                  <label key={location}>
                    <input
                      type="checkbox"
                      checked={formData.painLocation.includes(location)}
                      onChange={(e) => handlePainLocationChange(location, e.target.checked)}
                    />
                    {location}
                  </label>
                ))}
              </CheckboxGroup>
              {errors.painLocation && <span className="error-message">{errors.painLocation}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="symptoms">
                {t('forms.patient.step3.symptoms')}
                <span className="required">*</span>
              </label>
              <textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => updateField('symptoms', e.target.value)}
                placeholder="Describe your pain, stiffness, numbness, or other symptoms..."
                className={errors.symptoms ? 'error' : ''}
              />
              {errors.symptoms && <span className="error-message">{errors.symptoms}</span>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="medicalHistory">{t('forms.patient.step3.medicalHistory')}</label>
              <textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => updateField('medicalHistory', e.target.value)}
                placeholder="Previous injuries, surgeries, current medications..."
              />
            </FormGroup>

            <FormGroup>
              <label>{t('forms.patient.step3.hasAttorney')}</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="hasAttorney"
                    value="no"
                    checked={formData.hasAttorney === 'no'}
                    onChange={(e) => updateField('hasAttorney', e.target.value)}
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasAttorney"
                    value="yes"
                    checked={formData.hasAttorney === 'yes'}
                    onChange={(e) => updateField('hasAttorney', e.target.value)}
                  />
                  Yes
                </label>
              </RadioGroup>
            </FormGroup>

            {formData.hasAttorney === 'yes' && (
              <FormGrid className="two-column">
                <FormGroup>
                  <label htmlFor="attorneyName">
                    {t('forms.patient.step3.attorneyName')}
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
                  <label htmlFor="attorneyPhone">
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

export default PatientModal;