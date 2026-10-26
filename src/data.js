// Edit business details and services here.
export const business = {
  name: 'AE Accounting Associates',
  address: 'Lubaga, next to Access Building',
  email: 'aequityassociates@gmail.com',
  phones: ['+256 708 676 160', '+256 784 314 868'],
  // PLACEHOLDER: flyer does not say these numbers use WhatsApp. Confirm with the business.
  whatsapp: '256708676160',
}
export const serviceGroups = [
  { title: 'Tax returns & compliance', icon: 'FileText',
    blurb: 'Preparation and filing of returns so you stay compliant and on time.',
    items: ['VAT','LED','PAYE','Withholding tax (WHT)','Income tax','Rental tax','Presumptive tax','NSSF and other returns'] },
  { title: 'EFRIS analysis', icon: 'ScanSearch',
    blurb: 'Analysis of your EFRIS records to help you understand and reconcile your position.', items: ['EFRIS analysis'] },
  { title: 'Motor vehicle transfers', icon: 'Car',
    blurb: 'Help handling the paperwork involved in transferring vehicle ownership.', items: ['Motor vehicle transfers'] },
  { title: 'TIN acquisition', icon: 'IdCard',
    blurb: 'Support obtaining a Tax Identification Number for you or your business.', items: ['TIN acquisition'] },
  { title: 'Business registration & documentation', icon: 'Building2',
    blurb: 'Registering your business and preparing the documents that go with it.', items: ['Business registration','Documentation'] },
  { title: 'Business consultancy', icon: 'Lightbulb',
    blurb: 'Other business consultancy services. Contact us to discuss your needs.', items: ['Other consultancy services'] },
]
export const steps = [
  ['Get in touch','Call, email or message us with what you need.'],
  ['We discuss your needs','We clarify the service, the documents required and the timing.'],
  ['We do the work','We prepare, file or process on your behalf.'],
  ['You stay informed','We confirm the outcome and what to keep on record.'],
]
export const faqs = [
  ['Which services do you offer?','Tax return filing (VAT, LED, PAYE, WHT, income, rental, presumptive tax, NSSF and more), EFRIS analysis, motor vehicle transfers, TIN acquisition, business registration and documentation, and other business consultancy.'],
  ['Where are you located?','Lubaga, next to Access Building.'],
  ['How do I start?','Call or message us on the numbers in the contact page, or use the enquiry form to prepare an email or WhatsApp message.'],
  ['Should I send financial records through the website form?','No. The form is for a short enquiry only. Do not include confidential records. We will tell you how to share documents securely.'],
  ['What does it cost?','Fees depend on the service and your situation. Contact us for a quote.'],
]
