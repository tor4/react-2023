import { PortalWithState } from 'react-portal';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import './Dialog.css';


export function Dialog({ title, children, onClose }) {
  return (<PortalWithState closeOnOutsideClick closeOnEsc defaultOpen onClose={() => onClose && onClose()}>
    {({ closePortal, portal }) => (
      <>
        {portal(
          <FocusTrap>
            <div className='Dialog' role='dialog'>
              <h2>{title}</h2>
              <div className='content'>
                {children}
              </div>
              <button type='button' className='close' onClick={closePortal}>x</button>
            </div>
          </FocusTrap>
        )}
      </>
    )
    }
  </PortalWithState >)
};

Dialog.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};