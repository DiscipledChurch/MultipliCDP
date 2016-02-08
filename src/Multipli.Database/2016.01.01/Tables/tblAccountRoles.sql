CREATE TABLE [dbo].[tblAccountRoles]
(
	[AccountId] BIGINT NOT NULL,
	[OrgId] BIGINT NOT NULL,
	[RoleId] INT NOT NULL,
	CONSTRAINT [PK_tblAccountRoles] PRIMARY KEY ([AccountId], [OrgId], [RoleId] ASC),
	CONSTRAINT [FK_tblAccountRoles_AccountId_tblAccounts_Id] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[tblAccounts]([Id]),
	CONSTRAINT [FK_tblAccountRoles_OrganizationId_tblOrganizations_Id] FOREIGN KEY ([OrgId]) REFERENCES [dbo].[tblOrganizations]([Id]),
	CONSTRAINT [FK_tblAccountRoles_RoleId_tblRoles_Id] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[tblRoles]([Id])
)
