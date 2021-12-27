import { mount } from 'enzyme';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
    
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };
    
    test('debe de mostrar el componente redirect si no hay argumentos en la url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ [ '/hero' ] }>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );

        expect( wrapper.find( 'Redirect' ).exists() ).toBe( true );

    });

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find( '.row' ).exists() ).toBe( true );

    });

    test('debe de regresar a la pantalla anterior con push', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find( 'button' ).prop( 'onClick' )();

        expect( historyMock.push ).toHaveBeenCalledWith( '/' );
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('debe de regresar a la pantalla anterior con goback', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find( 'button' ).prop( 'onClick' )();

        expect( historyMock.goBack ).toHaveBeenCalled();
        expect( historyMock.push ).toHaveBeenCalledTimes( 0 );

    });

    test('debe de llamar el redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ [ '/hero/marvel-spider' ] }>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ historyMock } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe( '' );

    });
    
});
