import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account';

@Entity('old_user_passwords')
export class OldUserPassword {
    @PrimaryGeneratedColumn({ comment: 'Unique ID for each old password record' })
    id: number;

    @ManyToOne(() => Account, account => account.oldUserPasswords, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @Column({ name: 'account_id', type: 'int', nullable: false, comment: 'The account ID this old password belongs to' })
    accountId: number;

    @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: false, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'The hashed old password' })
    passwordHash: string;

    @Column({ name: 'password_set_at', type: 'timestamp', nullable: false, comment: 'The date/time when this password was set' })
    passwordSetAt: Date;

    @Column({ name: 'password_adapter', type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci', comment: 'Optional reference to password adapter or external system' })
    passwordAdapter?: string;
}
