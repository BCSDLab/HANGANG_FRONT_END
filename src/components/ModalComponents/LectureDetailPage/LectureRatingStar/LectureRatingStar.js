import RatingStarSVG from 'static/Shared/svg/rating_star.svg';
import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.li`
    position: relative;
    list-style: none;
    padding: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const EmptyStar = styled(RatingStarSVG)`
    position: absolute;
    width: 32px;
    height:32px;
    fill: #EEEEEE;
`;

const FullStarContainer = styled.div`
    position:relative;
    z-index: 10;
    width: ${(props) => (String(props.fillLevel * 16) + 'px')};
    height: 32px;
    overflow: hidden;
`;

const FullStar = styled(RatingStarSVG)`
    width: 32px;
    height:32px;
    fill: #FFAB2E;
`;

const LectureRatingStar = ({
    starReview,
    setStarReview,
    index,
}) => {
    const fillLevel = Number(starReview + 1 > (index + 1) * 2) + Number(starReview + 1 >= (index + 1) * 2);
    const onClickStar = (e) => {
        const absoluteClickedPosition = e.pageX - e.currentTarget.getBoundingClientRect().left;
        const starWidth = e.currentTarget.getBoundingClientRect().right - e.currentTarget.getBoundingClientRect().left;
        setStarReview(Math.round(absoluteClickedPosition / starWidth) + index * 2  + 1);
    }
    return (
        <StarContainer onClick={onClickStar}>
            <EmptyStar />
            <FullStarContainer fillLevel={fillLevel}>
                <FullStar />
            </FullStarContainer>
        </StarContainer>
    )
}

export default LectureRatingStar;
