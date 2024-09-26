package com.gsg.paltechlinker.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import com.gsg.paltechlinker.domain.dto.CompanyDto;
import com.gsg.paltechlinker.domain.entities.CompanyEntity;
import com.gsg.paltechlinker.mappers.Mapper;

@Component
public class CompanyMapperImpl implements Mapper<CompanyEntity, CompanyDto> {

    private ModelMapper modelMapper;


    public CompanyMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    @Override
    public CompanyDto mapTo(CompanyEntity companyEntity) {
        return modelMapper.map(companyEntity, CompanyDto.class);
    }

    @Override
    public CompanyEntity mapFrom(CompanyDto companyDto) {
        return modelMapper.map(companyDto, CompanyEntity.class);
    }
    
}
