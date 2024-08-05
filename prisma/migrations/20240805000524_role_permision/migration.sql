-- AlterTable
ALTER TABLE `User_details` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `profile_filename` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `role_Id` INTEGER NOT NULL,
    `permission_Id` INTEGER NOT NULL,

    PRIMARY KEY (`role_Id`, `permission_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_role_Id_fkey` FOREIGN KEY (`role_Id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permission_Id_fkey` FOREIGN KEY (`permission_Id`) REFERENCES `Permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
