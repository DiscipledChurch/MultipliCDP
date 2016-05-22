CREATE TABLE [dbo].[tblRelationships]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[RelationshipTypeId] SMALLINT NOT NULL,
	[PersonOneId] UNIQUEIDENTIFIER NOT NULL,
	[PersonTwoId] UNIQUEIDENTIFIER NOT NULL,
	CONSTRAINT [PK_tblRelationships] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [FK_tblRelationships_PersonOneId_tblPeople_Id] FOREIGN KEY ([PersonOneId]) REFERENCES [dbo].[tblPeople]([Id]),
	CONSTRAINT [FK_tblRelationships_PersonTwoId_tblPeople_Id] FOREIGN KEY ([PersonTwoId]) REFERENCES [dbo].[tblPeople]([Id])
)
