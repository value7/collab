import { Link } from 'react-router';
import styled from 'styled-components';

const NavItem = styled(Link)`
  background-color: white;

  &.${(props) => props.activeClassName} {
    border: 1px solid black;
    border-bottom: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 6px;
    background-color: #fafafa;
  }
`;

NavItem.defaultProps = {
  activeClassName: 'active',
};

export default NavItem;
