import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { aboutsAsyncActions, aboutsSelectors } from '../../../../redux/reducers/aboutReducer';

// Импорт модулей
import Picture from '../../../modules/Picture';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

// Импорт стилей
import './styles.scss';

const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`}`;

export default function About(props) {
  const dispatch = useDispatch();
  const abouts = useSelector(aboutsSelectors.abouts);

  useEffect(() => {
    if(!abouts) dispatch(aboutsAsyncActions.getElements());
  }, [dispatch, abouts])

  return (
    <section className="about" >
      {
        abouts?.map((about, index) => (
          <article key={about.id} className={(index + 1) % 2 !== 0 ? "about-article right" : "about-article left"}>
            <div className="img">
              <Picture reducerName='abouts' parentId={about.id} imageName={about.image}/>
            </div>

            <div className="text">
              <FadeIn>
                <h2>{about.title}</h2>
                <p>{about.text}</p>
              </FadeIn>
            </div>
          </article>
        ))
      }
    </section >
  );
}