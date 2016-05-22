CREATE TABLE [dbo].[tblAuthentications]
(
	[PersonId] UNIQUEIDENTIFIER NOT NULL,
	[Hash] NVARCHAR(128) NOT NULL,
	[Salt] NVARCHAR(128) NOT NULL,
	[ConfirmGuid] NVARCHAR(100) NULL,
	[Confirmed] BIT NOT NULL DEFAULT 0,
	[IsAuthorized] BIT NOT NULL DEFAULT 0,
	[CreateDate] DATETIME NOT NULL,
	[LastLogin] DATETIME NULL,
	CONSTRAINT [PK_tblAuthentications] PRIMARY KEY ([PersonId] ASC),
	CONSTRAINT [FK_tblAuthentications_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople]([Id])
)
