// Importing the Object-Relational Mapping library parts (ORM)
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account';


@Entity('account_user')
export class AccountUser {
    // User ID auto generated
    @PrimaryGeneratedColumn({comment: 'The user ID, unique and incremented' })
    id: number;

    // Personal information
    @Column({ name: 'first_name', nullable: false, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user first name' })
    firstName: string;

    @Column({ name: 'middle_name', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user optional middle name' })
    middleName: string | undefined;

    @Column({ name: 'last_name', nullable: false, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user last name' })
    lastName: string;

    @Column({ name: 'preferred_name', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user preferred name' })
    preferredName: string | undefined;

    @Column({ name: 'email_address', nullable: false, unique: true, type: 'varchar', length: 70, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user email address, the address used to sign in to the system' })
    emailAddress: string; // Check if you can add email on it for having the email address and domain after the @

    @Column({ name: 'phone_number', nullable: true, type: 'varchar', length: 15, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user phone number' })
    phoneNumber: string | undefined; // Check if you can add phone validation on it for having the country code and the correct phone number separately

    @Column({ name: 'mobile_phone', nullable: true, type: 'varchar', length: 15, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user mobile phone number' })
    mobilePhone: string | undefined; // Check if you can add phone validation on it for having the country code and the correct phone number separately

    @Column({ name: 'birthdate', nullable: true, type: 'date', comment: 'The user date of birth' })
    birthdate: Date | undefined; // Check if you can create validation on it to have only users 18 years and older

    @Column({ name: 'age', nullable: true, type: 'int', comment: 'The user age based on the birthdate' })
    age: number | undefined; // Check if you can create that based on the birthdate field

    @Column({ name: 'gender', nullable: false, type: 'enum', enum: ['Male', 'Female'], charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user gender: male/female' })
    gender: 'Male' | 'Female'; // check if you can use enum on it

    @Column({ name: 'home_address_building_name', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address building name' })
    homeAddressBuildingName: string | undefined;

    @Column({ name: 'home_address_building_number', nullable: true, type: 'int', comment: 'This is the user home address building number' })
    homeAddressBuildingNumber: number | undefined;

    @Column({ name: 'home_address_floor', nullable: true, type: 'int', comment: 'This is the user home address floor number' })
    homeAddressFloorNumber: number | undefined;

    @Column({ name: 'home_address_apt_no', nullable: true, type: 'int', comment: 'This is the user home address apartment number' })
    homeAddressAptNo: number | undefined;

    @Column({ name: 'home_address_street', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address street' })
    homeAddressStreet: string | undefined;

    @Column({ name: 'home_address_district', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address district' })
    homeAddressDistrict: string | undefined;

    @Column({ name: 'home_address_zip_code', nullable: true, type: 'int', comment: 'This is the user home address ZIP code' })
    homeAdressZipCode: number | undefined;

    @Column({ name: 'home_address_state_province', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address state / province' })
    homeAddressStateProvince: string | undefined;

    @Column({ name: 'home_address_country', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address country' })
    homeAddressCountry: string | undefined;

    @Column({ name: 'home_address', nullable: true, type: 'varchar', length: 350, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user home address' })
    homeAddress: string | undefined;

    @Column({ name: 'profile_picture_url', nullable: true, type: 'varchar', length: 256, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user photo url' })
    profilePictureUrl: string | undefined; // May reference profile picture url table

    @Column({ name: 'user_sysetm_bio', nullable: true, type: 'varchar', length: 256, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user system bio' })
    userSystemBio: string | undefined;

    @Column({ name: 'user_notes', nullable: true, type: 'varchar', length: 256, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the user system notes' })
    userNotes: string | undefined;



    /* Work Specific */
    @Column({ name: 'office_id', nullable: false, type: 'int', comment: 'This is the office the user is working at, the user must have an office so that all office amenities and notifications can be assigned to him/her' })
    officeId: number; // May reference another table or be an enum

    @Column({ name: 'department_id', nullable: false, type: 'int', comment: 'This is the department the user is working in, the user must have a department so that all department-related roles can be assigned to him/her' })
    departmentId: number; // May reference another table or be an enum

    @Column({ name: 'position_id', nullable: false, type: 'int', comment: 'This is the ID of the position / role of the user in the department' })
    positionId: number; // May reference another table or be an enum

    @Column({ name: 'team_id', nullable: true, type: 'int', comment: 'This is the ID of the team the user is working in' })
    teamId: number | undefined; // May reference another table or be an enum

    @Column({ name: 'employee_id', nullable: false, type: 'int', comment: 'This is the ID of the employee in the organization' })
    employeeId: number; // May reference another table or be an enum

    @Column({ name: 'supervisor_id', nullable: true, type: 'int', comment: 'ID of the user supervisor' })
    supervisorId: number | undefined; // References the supervisor user from the same table

    @Column({ name: 'job_title', nullable: false, type: 'varchar', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'Job title of the user' })
    jobTitle: string; // May reference another table or be an enum

    @Column({ name: 'permissions', nullable: false, type: 'varchar', array: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the list of user permissions in the system' })
    permissions: string[]; // May reference another table or be an enum



    @Column({ name: 'work_location', nullable: false, type: 'enum', enum: ['Home-Office', 'Remote', 'Hybrid'], comment: 'Where the user is working from' })
    workLocation: 'Home-Office' | 'Remote' | 'Hybrid'; // May reference another table or be an enum


    @Column({ name: 'source_system_id', nullable: true, type: 'int', comment: 'The system from which the user came, it could be internal or external' })
    sourceSystem: number | undefined;  // Reference systems table

    @Column({ name: 'cost_center_id', nullable: true, type: 'int', comment: 'The cost center the user is recorded under for salary and other working and running costs' })
    costCenter: number | undefined; // References cost centers table


    @Column({ name: 'language_preferences', nullable: true, type: 'enum', enum: [], charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The languages the user can work on data using them in the system (the languguages the user speaks and reads fluently)' })
    languagePreferences: 'Arabic' | 'English' | undefined; // References lagnuage table







    // Manager L1
    // Every user can have one manager l1 but a manager l1 can have multiple users, so this decorator defines a many-to-one
    // relationship between the current (AccountUser) entity and another AccountUser entity
    // () => AccountUser: is a lazy function that tells typeorm the target entity of the relationship. In this case it references
    // the same table AccountUser because managers are also users in the same table
    @ManyToOne(() => AccountUser, {nullable: true})
    // Specify the column in the foreign key column in the database that stores the reference to the related manager
    @JoinColumn({name: 'manager_id_l1'})
    managerL1?: AccountUser;

    @Column({name: 'manager_id_l1', nullable: true, type: 'int', comment: 'The ID of the manager in Level 1' })
    managerIdL1?: number | undefined;  // Check reference type and add manager name and password adapter


    // Manager L2
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l2' })
    managerL2?: AccountUser;

    @Column({ name: 'manager_id_l2', nullable: true, type: 'int', comment: 'The ID of the manager in Level 2' })
    managerIdL2?: number | undefined;  // Check reference type and add manager name and password adapter

    // Manager L3
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l3' })
    managerL3?: AccountUser;

    @Column({ name: 'manager_id_l3', nullable: true, type: 'int', comment: 'The ID of the manager in Level 3' })
    managerIdL3?: number | undefined;  // Check reference type and add manager name and password adapter

    // Manager L4
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l4' })
    managerL4?: AccountUser;

    @Column({ name: 'manager_id_l4', nullable: true, type: 'int', comment: 'The ID of the manager in Level 4' })
    managerIdL4?: number | undefined;  // Check reference type and add manager name and password adapter

    // Manager L5
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l5' })
    managerL5?: AccountUser;

    @Column({ name: 'manager_id_l5', nullable: true, type: 'int', comment: 'The ID of the manager in Level 5' })
    managerIdL5?: number | undefined;  // Check reference type and add manager name and password adapter

    
    // Manager L6
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l6' })
    managerL6?: AccountUser;

    @Column({ name: 'manager_id_l6', nullable: true, type: 'int', comment: 'The ID of the manager in Level 6' })
    managerIdL6?: number | undefined;  // Check reference type and add manager name and password adapter




    // Manager L7
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l7' })
    managerL7?: AccountUser;

    @Column({ name: 'manager_id_l7', nullable: true, type: 'int', comment: 'The ID of the manager in Level 7' })
    managerIdL7?: number | undefined;  // Check reference type and add manager name and password adapter




    // Manager L8
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l8' })
    managerL8?: AccountUser;

    @Column({ name: 'manager_id_l8', nullable: true, type: 'int', comment: 'The ID of the manager in Level 8' })
    managerIdL8?: number | undefined;  // Check reference type and add manager name and password adapter




    // Manager L9
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l9' })
    managerL9?: AccountUser;

    @Column({ name: 'manager_id_l9', nullable: true, type: 'int', comment: 'The ID of the manager in Level 9' })
    managerIdL9?: number | undefined;  // Check reference type and add manager name and password adapter





    // Manager L10
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l10' })
    managerL10?: AccountUser;

    @Column({ name: 'manager_id_l10', nullable: true, type: 'int', comment: 'The ID of the manager in Level 10' })
    managerIdL10?: number | undefined;  // Check reference type and add manager name and password adapter




    // Manager L11
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l11' })
    managerL11?: AccountUser;

    @Column({ name: 'manager_id_l11', nullable: true, type: 'int', comment: 'The ID of the manager in Level 11' })
    managerIdL11?: number | undefined;  // Check reference type and add manager name and password adapter




    // Manager L12
    @ManyToOne(() => AccountUser, {nullable: true})
    @JoinColumn({ name: 'manager_id_l12' })
    managerL12?: AccountUser;

    @Column({ name: 'manager_id_l12', nullable: true, type: 'int', comment: 'The ID of the manager in Level 12' })
    managerIdL12?: number | undefined;  // Check reference type and add manager name and password adapter



    @OneToMany(() => Account, account => account.user, {nullable: false, onDelete: 'CASCADE'})
    accounts: Account[];
}