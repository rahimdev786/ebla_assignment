
export interface Student {
    name: string;
    age: string;
    gender: string;
    dob: string;
    section: string;
    class: string;
    year: string;
    english: number;
    maths: number;
    physic: number;
    id: number;
}

// export interface StudentModel {
//     eblastudent: Eblastudent[];
// }

// export interface Eblastudent {
//     name:    string;
//     age:     string;
//     gender:  Gender;
//     dob:     Date;
//     section: Section;
//     class:   string;
//     year:    string;
//     english: number;
//     maths:   number;
//     physic:  number;
//     id:      number;
// }

// export enum Gender {
//     Female = "female",
//     Male = "male",
// }

// export enum Section {
//     Primary = "primary",
//     Secondary = "secondary",
// }

// // Converts JSON strings to/from your types
// export class Convert {
//     public static toWelcome(json: string): StudentModel {
//         return JSON.parse(json);
//     }
    
//     public static welcomeToJson(value: StudentModel): string {
//         return JSON.stringify(value);
//     }
// }


