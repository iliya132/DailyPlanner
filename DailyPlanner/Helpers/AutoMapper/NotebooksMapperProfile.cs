using AutoMapper;

using DailyPlanner.Common.Model.Entities;
using DailyPlanner.Common.ViewModels;

namespace DailyPlanner.Helpers.AutoMapper
{
    public class NotebooksMapperProfile :Profile
    {
        public NotebooksMapperProfile()
        {
            CreateMap<NoteBook, NotebookViewModel>()
                .ForMember(x => x.Id, map => map.MapFrom(p => p.Id))
                .ForMember(x => x.Name, map => map.MapFrom(p => p.Name))
                .ForMember(x => x.CreatedAt, map => map.MapFrom(p => p.CreatedAt))
                .ForMember(x => x.Color, map => map.MapFrom(p => p.Color))
                .ForMember(x=>x.Records, map=>map.MapFrom(p=>p.Notes));

            CreateMap<NotebookViewModel, NoteBook> ()
                .ForMember(x => x.Id, map => map.MapFrom(p => p.Id))
                .ForMember(x => x.Name, map => map.MapFrom(p => p.Name))
                .ForMember(x => x.CreatedAt, map => map.MapFrom(p => p.CreatedAt))
                .ForMember(x => x.Color, map => map.MapFrom(p => p.Color))
                .ForMember(x=>x.Notes, map=>map.MapFrom(p=>p.Records));

            CreateMap<Note, NoteViewModel>()
                .ForMember(x => x.Id, map => map.MapFrom(p => p.Id))
                .ForMember(x => x.Name, map => map.MapFrom(p => p.Name))
                .ForMember(x => x.CreatedAt, map => map.MapFrom(p => p.CreatedAt))
                .ForMember(x => x.Body, map => map.MapFrom(p => p.Body))
                .ForMember(x=>x.ParentNoteBookId, map=>map.MapFrom(p=>p.ParentNoteBookId));

            CreateMap<NoteViewModel, Note>()
                .ForMember(x => x.Id, map => map.MapFrom(p => p.Id))
                .ForMember(x => x.Name, map => map.MapFrom(p => p.Name))
                .ForMember(x => x.CreatedAt, map => map.MapFrom(p => p.CreatedAt))
                .ForMember(x => x.Body, map => map.MapFrom(p => p.Body))
                .ForMember(x => x.ParentNoteBookId, map => map.MapFrom(p => p.ParentNoteBookId));
        }
    }
}
