import {useState, useEffect} from 'react';

export default function ActiveLink({ href, children, position}) {

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);

  }, []);

  const isActive = currentPath === href;

  let positionClass = '';
    if (position === 'center') {
      positionClass = 'self-center';

    } else if (position === 'end') {
      positionClass = 'self-end';
    }

  const className  = `${positionClass} ${isActive ? 'orange-underline' : ''}`.trim();

  return (
     <a href={href} className={className}>{ children}</a>

  )

}
