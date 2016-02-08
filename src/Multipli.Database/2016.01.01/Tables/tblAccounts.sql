CREATE TABLE [dbo].[tblAccounts]
(
	[Id] BIGINT NOT NULL,
	[OrgId] BIGINT NOT NULL,
	[Username] NVARCHAR(15) NOT NULL,
	[Hash] NVARCHAR(128) NOT NULL,
	[Salt] NVARCHAR(128) NOT NULL,
	[Created] DATETIME NOT NULL,
	[LastLogin] DATETIME NOT NULL,
	CONSTRAINT [PK_tblAccounts] PRIMARY KEY ([Id], [OrgId] ASC),
	CONSTRAINT [FK_tblAccounts_OrgId_tblOrganizations_Id] FOREIGN KEY ([OrgId]) REFERENCES [dbo].[tblOrganizations]([Id])
)
