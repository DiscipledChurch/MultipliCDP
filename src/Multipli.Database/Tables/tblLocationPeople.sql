CREATE TABLE [dbo].[tblLocationPeople]
(
	[LocationId] UNIQUEIDENTIFIER NOT NULL,
	[PersonId] UNIQUEIDENTIFIER NOT NULL,
	CONSTRAINT [PK_tblLocationPeople_LocationId] PRIMARY KEY ([LocationId] ASC),
	CONSTRAINT [FK_tblLocationPeople_LocationId_tblLocations_Id] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[tblLocations]([Id]),
	CONSTRAINT [FK_tblLocationPeople_LocationId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople]([Id])
)
