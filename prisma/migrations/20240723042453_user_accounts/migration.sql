-- CreateTable
CREATE TABLE `User_accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_accounts_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `user_account_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_details_user_account_id_key`(`user_account_id`),
    UNIQUE INDEX `User_details_role_id_key`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_details` ADD CONSTRAINT `User_details_user_account_id_fkey` FOREIGN KEY (`user_account_id`) REFERENCES `User_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_details` ADD CONSTRAINT `User_details_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
