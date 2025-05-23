import { ShelterInfo } from '../types/types';

const shelterInfo: ShelterInfo = {
  name: 'Paws & Love Animal Shelter',
  address: '123 Pet Haven Lane, Anytown, ST 12345',
  phone: '(555) 123-4567',
  email: 'info@pawsandlove.org',
  hours: 'Monday-Friday: 10am-6pm\nSaturday: 10am-4pm\nSunday: Closed',
  about: 'Paws & Love Animal Shelter is a non-profit organization dedicated to rescuing and rehoming abandoned and surrendered pets. Our mission is to provide a safe haven for animals in need and to match them with loving forever homes. We have been serving our community since 2010 and have successfully placed over 5,000 pets in loving homes.',
  faqs: [
    {
      question: 'What are your adoption fees?',
      answer: 'Our adoption fees vary by animal type and age. Dogs: $150-$300, Cats: $75-$150, Small Animals: $25-$75. All pets are spayed/neutered, vaccinated, and microchipped before adoption.',
    },
    {
      question: 'What is the adoption process?',
      answer: '1. Browse available pets\n2. Submit an adoption application\n3. Meet with an adoption counselor\n4. Home visit (for some pets)\n5. Finalize adoption and take your new pet home!',
    },
    {
      question: 'Can I return a pet if it doesn\'t work out?',
      answer: 'Yes, we have a 30-day trial period. If the adoption doesn\'t work out within that time, you can return the pet for a full refund. After 30 days, we still accept returns but without a refund.',
    },
    {
      question: 'Do you accept surrendered pets?',
      answer: 'Yes, by appointment only. Please call us to discuss your situation. There may be a surrender fee depending on circumstances.',
    },
    {
      question: 'How can I volunteer?',
      answer: 'We welcome volunteers! Please visit our website to fill out a volunteer application and attend an orientation session.',
    },
    {
      question: 'Do you have foster opportunities?',
      answer: 'Yes, we always need foster homes, especially for kittens and puppies. Foster applications are available on our website.',
    },
  ],
};

export default shelterInfo;