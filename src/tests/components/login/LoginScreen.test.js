import { mount } from 'enzyme';
import AuthContext from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {

    const historyMock = {
        replace: jest.fn()
    };
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Miguel'
        }
    };
    
    const wrapper = mount(
        <AuthContext.Provider>
            <LoginScreen history={ historyMock }/>
        </AuthContext.Provider>
    );

    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();        
    });

    test('debe de realizar el dispatch y la navegacion', () => {

        const handleClick = wrapper.find( 'button' ).prop( 'onClick' );

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: contextValue.user.name
            }
        });

        expect( historyMock.replace ).toHaveBeenCalledWith( '/' );
        
        localStorage.setItem( 'lastPath', '/dc' );
        
        handleClick();
        
        expect( historyMock.replace ).toHaveBeenCalledWith( '/dc' );
    });
    
});
