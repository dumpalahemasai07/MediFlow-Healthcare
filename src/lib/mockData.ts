import d1 from "@/assets/doctor-1.jpg";
import d2 from "@/assets/doctor-2.jpg";
import d3 from "@/assets/doctor-3.jpg";
import d4 from "@/assets/doctor-4.jpg";
import d5 from "@/assets/doctor-5.jpg";
import d6 from "@/assets/doctor-6.jpg";
import d7 from "@/assets/doctor-7.jpg";
import d8 from "@/assets/doctor-8.jpg";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  city: string;
  hospital: string;
  languages: string[];
  image: string;
  about: string;
  education: { degree: string; institute: string; year: string }[];
  awards: string[];
  available: boolean;
  nextSlot: string;
};

export const specialties = [
  { slug: "cardiology", name: "Cardiology", count: 48, icon: "HeartPulse" },
  { slug: "neurology", name: "Neurology", count: 32, icon: "Brain" },
  { slug: "orthopedics", name: "Orthopedics", count: 41, icon: "Bone" },
  { slug: "pediatrics", name: "Pediatrics", count: 56, icon: "Baby" },
  { slug: "ophthalmology", name: "Ophthalmology", count: 27, icon: "Eye" },
  { slug: "dermatology", name: "Dermatology", count: 38, icon: "Sparkles" },
  { slug: "gynecology", name: "Gynecology", count: 33, icon: "Flower2" },
  { slug: "oncology", name: "Oncology", count: 22, icon: "Microscope" },
  { slug: "general", name: "General Medicine", count: 64, icon: "Stethoscope" },
  { slug: "dentistry", name: "Dentistry", count: 45, icon: "Smile" },
  { slug: "psychiatry", name: "Psychiatry", count: 29, icon: "Brain" },
  { slug: "ent", name: "ENT", count: 31, icon: "Ear" },
] as const;

export const cities = [
  "New York",
  "San Francisco",
  "Chicago",
  "Boston",
  "Seattle",
  "Austin",
  "Miami",
  "Los Angeles",
];

export const hospitals = [
  { id: "h1", name: "MediFlow Central Hospital", city: "New York", beds: 540, established: 1998 },
  { id: "h2", name: "Riverside Medical Center", city: "San Francisco", beds: 320, established: 2004 },
  { id: "h3", name: "Cedar Heights Hospital", city: "Chicago", beds: 410, established: 1992 },
  { id: "h4", name: "Bayview Specialty Clinic", city: "Boston", beds: 180, established: 2011 },
  { id: "h5", name: "Pacific Northwest Health", city: "Seattle", beds: 290, established: 2007 },
  { id: "h6", name: "Sunbelt Family Hospital", city: "Austin", beds: 220, established: 2015 },
];

export const doctors: Doctor[] = [
  {
    id: "marcus-hale",
    name: "Dr. Marcus Hale",
    specialty: "Cardiology",
    qualification: "MD, DM Cardiology",
    experience: 14,
    rating: 4.9,
    reviews: 412,
    fee: 95,
    city: "New York",
    hospital: "MediFlow Central Hospital",
    languages: ["English", "Spanish"],
    image: d1,
    about:
      "Interventional cardiologist with 14+ years of experience treating complex coronary artery disease, heart failure, and structural heart conditions. Known for a calm, patient-first consultation style.",
    education: [
      { degree: "MD", institute: "Johns Hopkins University", year: "2010" },
      { degree: "DM Cardiology", institute: "Cleveland Clinic Fellowship", year: "2014" },
    ],
    awards: ["Top Cardiologist NYC 2023", "ACC Young Investigator Award 2018"],
    available: true,
    nextSlot: "Today 4:30 PM",
  },
  {
    id: "elena-russo",
    name: "Dr. Elena Russo",
    specialty: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: 9,
    rating: 4.8,
    reviews: 286,
    fee: 75,
    city: "San Francisco",
    hospital: "Riverside Medical Center",
    languages: ["English", "Italian", "French"],
    image: d2,
    about:
      "Board-certified dermatologist specialising in medical and cosmetic dermatology, including acne, pigmentation, laser therapy and skin cancer screening.",
    education: [
      { degree: "MBBS", institute: "Stanford University", year: "2013" },
      { degree: "MD Dermatology", institute: "UCSF", year: "2017" },
    ],
    awards: ["Castle Connolly Top Doctor 2024"],
    available: true,
    nextSlot: "Today 6:15 PM",
  },
  {
    id: "arjun-mehta",
    name: "Dr. Arjun Mehta",
    specialty: "Neurology",
    qualification: "MD, DM Neurology",
    experience: 12,
    rating: 4.9,
    reviews: 358,
    fee: 110,
    city: "Chicago",
    hospital: "Cedar Heights Hospital",
    languages: ["English", "Hindi", "Gujarati"],
    image: d3,
    about:
      "Neurologist with expertise in stroke care, epilepsy, headache disorders and movement disorders. Active researcher in neurodegenerative diseases.",
    education: [
      { degree: "MD", institute: "Northwestern University", year: "2011" },
      { degree: "DM Neurology", institute: "Mayo Clinic Fellowship", year: "2015" },
    ],
    awards: ["AAN Excellence Award 2022"],
    available: false,
    nextSlot: "Tomorrow 10:00 AM",
  },
  {
    id: "sofia-lambert",
    name: "Dr. Sofia Lambert",
    specialty: "Pediatrics",
    qualification: "MBBS, MD Pediatrics",
    experience: 8,
    rating: 4.95,
    reviews: 521,
    fee: 70,
    city: "Boston",
    hospital: "Bayview Specialty Clinic",
    languages: ["English", "French"],
    image: d4,
    about:
      "Compassionate pediatrician focused on preventive care, developmental milestones, vaccinations, and adolescent health.",
    education: [
      { degree: "MBBS", institute: "Harvard Medical School", year: "2014" },
      { degree: "MD Pediatrics", institute: "Boston Children's Hospital", year: "2018" },
    ],
    awards: ["Boston Magazine Top Doctor 2024"],
    available: true,
    nextSlot: "Today 5:00 PM",
  },
  {
    id: "olivia-bennett",
    name: "Dr. Olivia Bennett",
    specialty: "Cardiology",
    qualification: "MD, FACC",
    experience: 17,
    rating: 4.9,
    reviews: 487,
    fee: 120,
    city: "Seattle",
    hospital: "Pacific Northwest Health",
    languages: ["English", "German"],
    image: d5,
    about:
      "Non-invasive cardiologist with deep expertise in echocardiography, women's heart health and preventive cardiology.",
    education: [
      { degree: "MD", institute: "University of Washington", year: "2007" },
      { degree: "Cardiology Fellowship", institute: "Mass General", year: "2012" },
    ],
    awards: ["AHA Women in Cardiology Award 2021"],
    available: true,
    nextSlot: "Today 3:45 PM",
  },
  {
    id: "kenji-tanaka",
    name: "Dr. Kenji Tanaka",
    specialty: "Orthopedics",
    qualification: "MS Ortho, FRCS",
    experience: 21,
    rating: 4.85,
    reviews: 612,
    fee: 130,
    city: "Los Angeles",
    hospital: "MediFlow Central Hospital",
    languages: ["English", "Japanese"],
    image: d6,
    about:
      "Joint replacement and sports medicine specialist. Pioneer of minimally invasive knee and hip arthroplasty techniques.",
    education: [
      { degree: "MS Orthopedics", institute: "UCLA", year: "2003" },
      { degree: "FRCS", institute: "Royal College of Surgeons", year: "2006" },
    ],
    awards: ["AAOS Distinguished Service Award 2020"],
    available: true,
    nextSlot: "Today 7:00 PM",
  },
  {
    id: "amara-johnson",
    name: "Dr. Amara Johnson",
    specialty: "Gynecology",
    qualification: "MBBS, MD OBG",
    experience: 11,
    rating: 4.9,
    reviews: 394,
    fee: 90,
    city: "Miami",
    hospital: "Sunbelt Family Hospital",
    languages: ["English", "Spanish"],
    image: d7,
    about:
      "Obstetrician-gynecologist with a focus on high-risk pregnancy, fertility counselling and minimally invasive gynecological surgery.",
    education: [
      { degree: "MBBS", institute: "Emory University", year: "2012" },
      { degree: "MD OBG", institute: "Johns Hopkins", year: "2016" },
    ],
    awards: ["ACOG Excellence Award 2023"],
    available: true,
    nextSlot: "Tomorrow 9:30 AM",
  },
  {
    id: "rohan-kapoor",
    name: "Dr. Rohan Kapoor",
    specialty: "Oncology",
    qualification: "MD, DM Medical Oncology",
    experience: 16,
    rating: 4.9,
    reviews: 268,
    fee: 150,
    city: "Austin",
    hospital: "Cedar Heights Hospital",
    languages: ["English", "Hindi", "Punjabi"],
    image: d8,
    about:
      "Medical oncologist treating breast, lung, GI and hematologic cancers. Strong focus on personalised targeted therapy and patient counselling.",
    education: [
      { degree: "MD", institute: "AIIMS Delhi", year: "2008" },
      { degree: "DM Oncology", institute: "MD Anderson Fellowship", year: "2013" },
    ],
    awards: ["ASCO Merit Award 2019"],
    available: false,
    nextSlot: "Tomorrow 11:15 AM",
  },
];

export const reviews = [
  { id: "r1", patient: "Sarah M.", rating: 5, when: "2 weeks ago", text: "Extremely attentive and explained every step of my treatment. Highly recommend." },
  { id: "r2", patient: "James K.", rating: 5, when: "1 month ago", text: "Professional, knowledgeable, and the booking experience was seamless." },
  { id: "r3", patient: "Priya R.", rating: 4, when: "1 month ago", text: "Great consultation. Wait time was slightly longer than expected." },
  { id: "r4", patient: "Daniel O.", rating: 5, when: "2 months ago", text: "World-class care. The follow-up via the app was a huge plus." },
];

export const insurancePartners = [
  "Aetna", "Cigna", "BlueCross", "UnitedHealth", "Humana", "Kaiser", "Anthem", "Oscar",
];

export const blogPosts = [
  {
    id: "b1",
    title: "10 early warning signs of heart disease you shouldn't ignore",
    category: "Cardiology",
    readMin: 6,
    author: "Dr. Marcus Hale",
  },
  {
    id: "b2",
    title: "A parent's guide to childhood vaccinations in 2026",
    category: "Pediatrics",
    readMin: 8,
    author: "Dr. Sofia Lambert",
  },
  {
    id: "b3",
    title: "How telemedicine is reshaping post-surgery recovery",
    category: "Innovation",
    readMin: 5,
    author: "MediFlow Editorial",
  },
];

// Generate slot times for a given date
export function generateSlots(date: Date): { time: string; period: "morning" | "evening"; booked: boolean }[] {
  const morning = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];
  const evening = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];
  // Deterministic "booked" pattern from date
  const seed = date.getDate();
  return [
    ...morning.map((t, i) => ({ time: t, period: "morning" as const, booked: (i + seed) % 4 === 0 })),
    ...evening.map((t, i) => ({ time: t, period: "evening" as const, booked: (i + seed) % 5 === 0 })),
  ];
}

export function getDoctorById(id: string) {
  return doctors.find((d) => d.id === id);
}
