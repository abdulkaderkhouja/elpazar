import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { AccountUser } from './account_user';
import { FailedLoginAttempt } from './failed_user_login_attempts';
import { OldUserPassword } from './old_user_passwords';

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn({ comment: 'Account ID, unique' })
    id: number;

    @ManyToOne(() => AccountUser, user => user.accounts, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: AccountUser;

    @Column({ name: 'user_id', type: 'int', nullable: false })
    userId: number;

    // System credentials & security
    @Column({ name: 'username', nullable: false, unique: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the username the user enters for logging in' })
    username: string;

    @Column({ name: 'password_hash', nullable: false, type: 'varchar', length: 255, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The hashed user password in the system, hashing algorithm is argon2id' })
    passwordHash: string;

    @Column({ name: 'two_factor_enabled', nullable: false, type: 'boolean', comment: 'Either 2FA enabled or not' })
    twoFactorEnabled: boolean; // Set it to false on user creation and to true when the user or admins enable it

    @Column({ name: 'failed_login_attempts', nullable: true, type: 'varchar', array: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'A list of the user failed login attempts' })
    failedLoginAttempts?: string[] | undefined; // This has all details in the failed_login_attempts.ts model


    @Column({ name: 'old_user_passwords', nullable: true, type: 'varchar', array: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'Lists all the hashed old passwords the user have set for referece' })
    oldUserPasswords?: string[] | undefined;

    @Column({ name: 'lockout_until', nullable: true, type: 'timestamp', comment: 'This is used in account lockout policy, if the user fails login n times (i.e. 5 times), lock account for N minutes (i.e. 15 minutes). This field stores when the lockout expires' })
    lockoutUntil?: Date;

    @Column({ name: 'password_changed_at', nullable: true, type: 'timestamp', comment: 'When the password was changed lastly' })
    passwordChangedAt?: Date;

    @Column({ name: 'reset_password_token', nullable: true, type: 'varchar', length: 256, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'temporary token for password reset' })
    resetPasswordToken?: string | undefined;

    @Column({ name: 'reset_password_token_expiry', nullable: true, type: 'timestamp', comment: 'This is the expiry date for reset password expiry' })
    resetPasswordTokenExpiry?: Date;

    @Column({ name: 'password_adapter', nullable: true, type: 'varchar', array: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'A reference to the latest external passwords for SSO authentication' })
    passwordAdapter?: string[] | undefined; // reference the password_adapter.ts model


    // System access
    @Column({ name: 'user_access_roles', nullable: false, type: 'varchar', array: true, comment: 'This roles assigned to the user in the system by admins' })
    userAccessRoles: string[];

    @Column({ name: 'user_access_groups', nullable: false, type: 'varchar', array: true, comment: 'This groups assigned to the user in the system by admins' })
    userAccessGroups: string[];

    @Column({ name: 'user_accessed_solutions', nullable: false, type: 'varchar', array: true, comment: 'The solutions the user can access' })
    userAccessedSolutions: string[];

    @Column({ name: 'is_active', nullable: false, type: 'boolean', comment: 'The user active on the system or not (like suspended from the system)' })
    isActive: boolean;

    @Column({ name: 'status', nullable: false, type: 'enum', enum: ['Active', 'Inactive', 'Pending', 'Suspended', 'Deleted'], charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The status of the user on the system (Active, Inactive, Suspended, Deleted)' })
    status: 'Active' | 'Inactive' | 'Pending' | 'Suspended' | 'Deleted';

    @Column({ name: 'theme_preference', nullable: false, type: 'enum', enum: ['Dark', 'Light', 'Default'], charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The mode the user is working on in the system for either dark, light, or system default' })
    themePreference: 'Dark' | 'Light' | 'Default';

    @Column({ name: 'locale_id', nullable: false, type: 'varchar', length: 5, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The locale of the language selected by the user in the system', default: 'en_US' })
    localeId: string;

    @Column({ name: 'timezone', nullable: false, type: 'varchar', length: 5, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The timezone the user is working in' })
    timezone: string; // Get it automatically based on the IP

    @Column({ name: 'is_admin', nullable: false, type: 'enum', enum: ['Yes', 'No'], comment: 'Does the user have system-wide admin rights' })
    isAdmin: 'Yes' | 'No';

    @Column({ name: 'last_login_at', nullable: true, type: 'timestamp', comment: 'The date the user last did login to the system at, it is nullabe as new users do not have last login yet until they log in after the admin creates their account, roles, and accesses' })
    lastLoginAt: Date;

    @CreateDateColumn({ name: 'created_at', nullable: false, type: 'timestamp', comment: 'The date the user was created on the system at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'created_by_id', nullable: false, type: 'int', comment: 'This is the ID of the user who created the current user in the system' })
    createdById: number;

    @Column({ name: 'created_by', nullable: false, type: 'varchar', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'This is the name of the user who created the current user in the system' })
    createdBy: string;

    @UpdateDateColumn({ name: 'last_updated_at', nullable: true, type: 'timestamp', comment: 'The date the user was last updated on the system at' })
    lastUpdatedAt: Date;

    @Column({ name: 'last_updated_by_id', nullable: true, type: 'int', comment: 'The ID of the user who last updated the current user on the system' })
    lastUpdatedById: number;

    @Column({ name: 'last_updated_by', nullable: true, type: 'varchar', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The name of the user who last updated the current user on the system' })
    lastUpdatedBy: string;

    @Column({ name: 'suspended_at', nullable: true, type: 'timestamp', comment: 'The date the user was suspended from the system at' })
    suspendedAt: Date;

    @Column({ name: 'suspended_by_id', nullable: true, type: 'int', comment: 'this is the ID the user who suspended the current user on the system' })
    suspendedById: number;

    @Column({ name: 'suspended_by', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The name of the user who suspended the current user on the system' })
    suspendedByName: string;

    @Column({ name: 'deleted_at', nullable: true, type: 'timestamp', comment: 'The date the current user was deleted from the system at' })
    deletedAt: Date;

    @Column({ name: 'deleted_by_id', nullable: true, type: 'int', comment: 'this is the ID the user who deleted the current user on the system' })
    deletedById: number;

    @Column({ name: 'deleted_by', nullable: true, type: 'varchar', length: 50, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The name of the user who deleted the current user on the system' })
    deletedBy: string;




    //Relations
    @OneToMany(() => FailedLoginAttempt, attempt => attempt.account)
    failedLoginAttempts: FailedLoginAttempt[];

    @OneToMany(() => OldUserPassword, oldUserPassword => oldUserPassword.account)
    oldUserPasswords: OldUserPassword[];
}
