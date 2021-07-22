import LectureRatingStar from '../LectureRatingStar/LectureRatingStar';
import React from 'react';
import styled from 'styled-components';

export const LectureRatingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
`;

const LectureRating = (_, ref) => {
    const [starReview, setStarReview] = React.useState(6);
    React.useImperativeHandle(ref, () => ({
        value: starReview / 2,
    }), [starReview]);

    return (
        <LectureRatingContainer>
            {Array.from({length: 5}, (_, index) => (index))
                .map((value) => (
                    <LectureRatingStar
                        key={value}
                        starReview={starReview}
                        setStarReview={setStarReview}
                        index={value} />
                )
            )}
        </LectureRatingContainer>
    );
};

export default React.forwardRef(LectureRating);
