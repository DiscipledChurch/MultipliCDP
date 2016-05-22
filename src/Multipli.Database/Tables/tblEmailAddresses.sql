CREATE TABLE [dbo].[tblEmailAddresses]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[PersonId] UNIQUEIDENTIFIER NOT NULL,
	[Address] NVARCHAR(255) NOT NULL,
	[ConfirmGuid] NVARCHAR(100) NULL,
	[Confirmed] BIT NOT NULL DEFAULT 0,
	[IsPrimary] BIT NOT NULL DEFAULT 0,
	[LocationSubscribed] BIT NOT NULL DEFAULT 1,
	[MarketingSubscribed] BIT NOT NULL DEFAULT 1,
	[SystemSubscribed] BIT NOT NULL DEFAULT 1,
	[IsDeleted] BIT NOT NULL DEFAULT 0,
	CONSTRAINT [PK_tblEmailAddresses] PRIMARY KEY NONCLUSTERED ([Id], [PersonId] ASC),
	CONSTRAINT [FK_tblEmailAddresses_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople]([Id])
)
