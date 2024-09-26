package com.gsg.paltechlinker.mappers;

// encapsulates all of the logic for mapping
public interface Mapper<A, B> {

    B mapTo(A a);

    A mapFrom(B b);
    
}
