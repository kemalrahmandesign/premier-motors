// Site copy that is longer than a single fact. Business facts and specials live in site.json.
// Rules from the client brief are enforced here by omission: no prices outside the specials,
// no services the shop does not offer, no owner name, no fleet client names.

export const bodyWork = [
  { icon: 'collision', title: 'Body work & collision repair', text: 'From minor scrapes to major collision damage, repaired right and returned looking like it should.' },
  { icon: 'dent', title: 'Dent repair', text: 'Door dings, hail and parking-lot dents taken care of.' },
  { icon: 'paint', title: 'Auto painting', text: 'Panel refinishing and paint work matched to your vehicle.' },
  { icon: 'glass', title: 'Windshield & glass', text: 'Cracked windshields and broken glass replaced.' },
];

export const insurance = [
  {
    title: 'All insurance accepted',
    lines: ['We work with all insurance companies.'],
    strong: 'Save on your deductible: up to $500.',
  },
  {
    title: 'CarMax MaxCare',
    lines: ['We accept all CarMax MaxCare coverage.'],
    strong: 'Save on your deductible.',
  },
];

export const trust = [
  { big: '2003', label: 'In business since 2003', text: 'Serving Rockville drivers for over two decades.' },
  { big: '30+', label: 'Years of experience', text: '30+ years of auto repair experience.' },
  { big: '24', label: 'Years of fleet service', text: 'Trusted to keep business fleets on the road.' },
  { big: '12/12', label: 'Month / mile warranty', text: '12-month / 12,000-mile warranty on parts and labor.' },
];

export const trustBadges = [
  { icon: 'doc', label: 'Free estimates' },
  { icon: 'clock', label: 'Same-day service, most jobs' },
  { icon: 'shield', label: 'ASE certified' },
  { icon: 'globe', label: 'Se habla español' },
  { icon: 'hand', label: 'Honest service on every job' },
];

export const serviceGroups = [
  {
    id: 'maintenance', icon: 'oil', title: 'Maintenance',
    items: [
      'Oil changes (conventional and synthetic)',
      'Scheduled maintenance (30k / 60k / 90k)',
      'Fluid services: coolant, brake, transmission, power steering',
      'Filters: air, cabin, fuel',
      'Tune-ups: spark plugs, ignition coils',
      'Belts and hoses (serpentine, timing belt)',
      'Wipers, bulbs and small fixes',
      'Maryland State Safety Inspection',
    ],
  },
  {
    id: 'brakes', icon: 'brake', title: 'Brakes, suspension & steering',
    items: [
      'Brake pads and rotors',
      'Brake calipers, lines and ABS',
      'Shocks and struts',
      'Control arms, ball joints, tie rods, bushings',
      'Wheel alignment',
      'Wheel bearings and CV axles',
    ],
  },
  {
    id: 'engine', icon: 'engine', title: 'Engine, diagnostics & electrical',
    items: [
      'Check engine light diagnostics',
      'Engine repair: leaks, gaskets, mounts',
      'Major engine work and engine replacement',
      'Cooling system: radiator, water pump, thermostat',
      'Battery testing and replacement',
      'Alternators and starters',
      'Electrical: wiring, power windows, lights',
      'Fuel system: fuel pumps, injectors',
    ],
  },
  {
    id: 'transmission', icon: 'gear', title: 'Transmission, drivetrain & exhaust',
    items: [
      'Transmission service',
      'Transmission repair and replacement',
      'Clutch replacement',
      'Differential, transfer case, 4x4 and AWD',
      'Exhaust and mufflers',
      'Catalytic converters',
      'Emissions repair (to pass VEIP)',
    ],
  },
  {
    id: 'tires', icon: 'tire', title: 'Tires',
    items: ['Tire sales', 'Mount and balance', 'Tire rotation'],
  },
  {
    id: 'ac', icon: 'snow', title: 'Heating & A/C',
    items: ['A/C recharge and repair', 'Heater and blower motor'],
  },
  {
    id: 'towing', icon: 'tow', title: 'Towing',
    items: ['Towing available. Call and we’ll get your vehicle to the shop.'],
  },
];

export const vehicles = [
  { title: 'American', text: 'All makes', makes: ['Ford', 'Chevrolet', 'GMC', 'Dodge', 'Jeep', 'Ram', 'Chrysler', 'Buick', 'Cadillac', 'Lincoln'] },
  { title: 'Japanese', text: 'All makes', makes: ['Toyota', 'Honda', 'Nissan', 'Subaru', 'Mazda', 'Lexus', 'Acura', 'Infiniti', 'Mitsubishi'] },
  { title: 'Korean', text: 'All makes', makes: ['Hyundai', 'Kia'] },
  { title: 'European', text: 'Most makes', makes: [] },
];

export const vehicleTypes = ['Cars', 'Pickup trucks', 'Full-size SUVs', 'Work vans: Transit, ProMaster, Express, Sprinter'];

export const about = [
  'Premier Motors has been serving Rockville drivers since 2003. Our owner has more than 30 years of experience in auto repair, including 24 years keeping business fleets on the road. Now we bring that same reliability to every driver who comes through our door.',
  'From oil changes and brakes to engine work, transmissions and full body repair, our team of five handles it all under one roof. What sets us apart is simple: service and honesty on every job.',
];

export const experience = [
  ['Appointments & walk-ins', 'Request a time online or just stop by.'],
  ['Free estimates', 'Know what the job involves before we start.'],
  ['Same-day service', 'On most common jobs.'],
  ['OEM & quality aftermarket parts', 'Backed by our 12-month / 12,000-mile warranty.'],
  ['After-hours key drop', 'Drop your car off when it suits you.'],
  ['Waiting area', 'Stay while we work on quick jobs.'],
  ['Credit cards & cash', 'All major credit cards accepted.'],
  ['Ask about our discounts', 'Just ask when you call or stop by.'],
];

export const faq = [
  ['Do I need an appointment?', 'No. Appointments and walk-ins are both welcome. You can request an appointment on this website or call us at (301) 340-2130.'],
  ['Do you give free estimates?', 'Yes. Estimates are free, for mechanical repair and body work alike.'],
  ['How long will my repair take?', 'Most common jobs are done the same day. For bigger repairs we’ll give you a clear timeline with your estimate.'],
  ['Do you work with my insurance company?', 'Yes. We work with all insurance companies, and you can save on your deductible: up to $500. Call for details.'],
  ['Do you accept CarMax MaxCare?', 'Yes. We accept all CarMax MaxCare coverage, and you can save on your deductible. Call for details.'],
  ['What warranty do you offer?', 'Our repairs carry a 12-month / 12,000-mile warranty on parts and labor.'],
  ['What parts do you use? Can I bring my own?', 'We use OEM and quality aftermarket parts. We don’t install customer-supplied parts.'],
  ['What vehicles do you work on?', 'We service most American, Japanese, Korean and European cars, trucks, SUVs and work vans, including Ford Transit, Ram ProMaster, Chevy Express and Sprinter vans.'],
  ['Can I drop my car off after hours?', 'Yes. We have an after-hours key drop at our Unit G office.'],
  ['What forms of payment do you accept?', 'All major credit cards and cash.'],
  ['Do you offer towing?', 'Yes, towing is available. Give us a call.'],
  ['¿Hablan español?', 'Sí. Se habla español. Llámenos al (301) 340-2130.'],
];

export const formServices = [
  'Specials', 'Body work / insurance claim', 'Maintenance', 'Brakes', 'Engine / check engine light', 'Transmission', 'A/C', 'Tires', 'Other',
];
