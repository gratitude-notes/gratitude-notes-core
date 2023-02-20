import React from "react";
import styled from "styled-components";
import { IonSearchbar } from '@ionic/react';
import { search } from 'ionicons/icons';

const searchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5%;
`

const SearchBar = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="center-display-flex-container">
        <IonSearchbar searchIcon={search} placeholder="Search Notes"></IonSearchbar>
    </div>
));
export default SearchBar; 