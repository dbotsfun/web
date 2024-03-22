export enum PermissionFlags {
    // Bots
    Read = 1, // 1
    Edit = 4, // 4
    Delete = 8, // 8

    // Tags
    CreateTags = 16, // 16
    DeleteTags = 32, // 32
    EditTags = 64, // 64

    // Reviews
    DeleteReviews = 128, // 128

    // Replies
    DeleteReplies = 256, // 256

    // Users
    BanMembers = 512, // 512

    // Manage bots
    ApproveBots = 1024, // 1024
    RejectBots = 2048, // 2048
    Administrator = 4096 // 4096
}
