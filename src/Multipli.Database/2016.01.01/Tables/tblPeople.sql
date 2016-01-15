CREATE TABLE [dbo].[tblPeople]
(
	[Id] BIGINT NOT NULL,
	[FirstName] NVARCHAR(75) NULL,
	[LastName] NVARCHAR(75) NULL,
	[Birthdate] DATETIME NULL,
	[GenderId] SMALLINT NULL,
	[FamilyId] BIGINT NOT NULL,
	CONSTRAINT [PK_tblPeople] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [FK_tblPeople_GenderId_tblGenders_Id] FOREIGN KEY ([GenderId]) REFERENCES [dbo].[tblGenders]([Id]),
	CONSTRAINT [FK_tblPeople_FamilyId_tblFamilies_Id] FOREIGN KEY ([FamilyId]) REFERENCES [dbo].[tblFamilies]([Id])
)
