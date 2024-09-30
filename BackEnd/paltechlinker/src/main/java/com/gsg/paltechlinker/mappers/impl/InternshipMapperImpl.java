package com.gsg.paltechlinker.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.gsg.paltechlinker.domain.dto.InternshipDto;
import com.gsg.paltechlinker.domain.entities.InternshipEntity;
import com.gsg.paltechlinker.mappers.Mapper;

@Component
public class InternshipMapperImpl implements Mapper<InternshipEntity, InternshipDto> {

    private ModelMapper modelMapper;

    public InternshipMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    @Override
    public InternshipDto mapTo(InternshipEntity internshipEntity) {
        return modelMapper.map(internshipEntity, InternshipDto.class);
    }

    @Override
    public InternshipEntity mapFrom(InternshipDto internshipDto) {
        return modelMapper.map(internshipDto, InternshipEntity.class);
    }

    
}
