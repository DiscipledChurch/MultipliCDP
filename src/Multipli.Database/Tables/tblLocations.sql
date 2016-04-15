CREATE TABLE [dbo].[tblLocations]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[OrganizationId] UNIQUEIDENTIFIER NOT NULL,
	[Name] NVARCHAR(1024) NOT NULL,
	[Hostname] NVARCHAR(15) NULL,
	[CustomUrl] NVARCHAR(1024) NULL,
	[IsAuthorized] BIT NULL,
	CONSTRAINT [PK_tblLocations] PRIMARY KEY ([Id], [OrganizationId] ASC)
)
