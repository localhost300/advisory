export type AdvisorSpecialty='Wealth Management'|'Retirement'|'Tax Planning'|'Estate Planning'|'Business / Entrepreneurial'|'Investment Planning'
export type Advisor={id:string;name:string;initials:string;email:string;reportUrl:string;specialties:AdvisorSpecialty[];years:number;firmCount:number;licensedStates:number;sroCount:number;location:string;fiduciary:boolean;availability:'Accepting clients'|'Limited availability';about:string;approach:string;credentials:string[];communication:('Email'|'Phone')[]}
export type QuestionnaireAnswers={name:string;email:string;phone:string;country:string;age:string;goals:string[];risk:string;experience:string;investingYears:string;assets:string;specialties:string[];approach:string;communication:string}
export type FinanceArticle={headline:string;source:string;published:string;category:string;summary:string;url:string}
export type AdvisorMatch=Advisor&{score:number;reason:string}
