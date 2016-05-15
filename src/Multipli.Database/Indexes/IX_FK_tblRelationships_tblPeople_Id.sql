CREATE CLUSTERED INDEX [IX_FK_tblRelationships_tblPeople_Id]
	ON [dbo].[tblRelationships]
	(PersonOneId, PersonTwoId)
