CREATE TABLE [dbo].[tblPeople]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[FirstName] NVARCHAR(75) NULL,
	[LastName] NVARCHAR(75) NULL,
	[Birthdate] DATETIME NULL,
	[GenderId] SMALLINT NULL,
	CONSTRAINT [PK_tblPeople] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [FK_tblPeople_GenderId_tblGenders_Id] FOREIGN KEY ([GenderId]) REFERENCES [dbo].[tblGenders]([Id])
)
