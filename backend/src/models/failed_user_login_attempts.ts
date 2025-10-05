import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Account } from './account';

@Entity('failed_login_attempts')
export class FailedLoginAttempt {
    @PrimaryGeneratedColumn({ comment: 'Unique ID of the failed login attempt' })
    id: number;

    @ManyToOne(() => Account, account => account.failedLoginAttempts, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @Column({ name: 'account_id', type: 'int', nullable: false, comment: 'The ID of the user who had the failed login attempt' })
    accountId: number;

    @Column({ name: 'ip_address', type: 'varchar', length: 50, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'IP address from which the failed login attempt originated' })
    ipAddress?: string;

    @Column({ name: 'user_agent', type: 'varchar', length: 256, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci',  comment: 'User agent of the device used for login attempt' })
    userAgent?: string;

    @Column({ name: 'reason', type: 'varchar', length: 256, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci',  comment: 'Reason for failure, e.g., incorrect password' })
    reason?: string;

    @CreateDateColumn({ name: 'attempted_at', type: 'timestamp', comment: 'Date & time of the failed login attempt' })
    attemptedAt: Date;
}
