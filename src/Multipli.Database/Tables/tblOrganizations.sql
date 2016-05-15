CREATE TABLE [dbo].[tblOrganizations]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[Name] NVARCHAR(1024) NOT NULL,
	[Hostname] NVARCHAR(25) NOT NULL,
	[CustomUrl] NVARCHAR(1024) NULL,
	[IsAuthorized] BIT NOT NULL DEFAULT 1,
	CONSTRAINT [PK_tblOrganizations] PRIMARY KEY ([Id] ASC),
	CONSTRAINT [UC_tblOrganizations_Hostname] UNIQUE ([Hostname]),
	CONSTRAINT [UC_tblOrganizations_CustomUrl] UNIQUE ([CustomUrl])
)
