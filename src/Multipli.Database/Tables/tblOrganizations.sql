CREATE TABLE [dbo].[tblOrganizations]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[Name] NVARCHAR(1024) NOT NULL,
	[Hostname] NVARCHAR(15) NOT NULL,
	[CustomUrl] NVARCHAR(1024) NULL,
	[IsAuthorized] BIT NOT NULL,
	CONSTRAINT [PK_tblOrganizations] PRIMARY KEY ([Id] ASC)
)
