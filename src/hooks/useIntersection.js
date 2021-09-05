// https://github.com/fedgkr/feconf2020/blob/master/src/utils/hooks/use-intersection.ts 를 참고하였습니다.
import React from 'react';

const useIntersection = (
  ref,
  option = {
    threshold: 0,
  },
) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      const { threshold = 0 } = option;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const {
              isIntersecting,
              boundingClientRect: { y },
            } = entry;
            const responseToTop = y >= 0;

            if (responseToTop) {
              setVisible(isIntersecting);
            }
          });
        },
        { threshold },
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
    return () => undefined;
  }, [option, ref]);
  return visible;
};

export default useIntersection;
