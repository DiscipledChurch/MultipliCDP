CREATE TABLE [dbo].[tblAccounts]
(
	[Id] BIGINT NOT NULL,
	[OrgId] BIGINT NOT NULL,
	[PersonId] BIGINT NOT NULL,
	[Username] NVARCHAR(15) NOT NULL,
	[Hash] NVARCHAR(128) NOT NULL,
	[Salt] NVARCHAR(128) NOT NULL,
	[Created] DATETIME NOT NULL,
	[LastLogin] DATETIME NOT NULL,
	CONSTRAINT [PK_tblAccounts] PRIMARY KEY ([Id], [OrgId], [PersonId] ASC),
	CONSTRAINT [FK_tblAccounts_OrgId_tblOrganizations_Id] FOREIGN KEY ([OrgId]) REFERENCES [dbo].[tblOrganizations]([Id]),
	CONSTRAINT [FK_tblAccounts_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople]([Id])
)
