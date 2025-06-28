// components/MyContainer.tsx
import {Container, ContainerProps} from '@mui/material'
import {styled} from '@mui/system'

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'inherit',
})

const MyContainer = (props: ContainerProps) => {
    return <StyledContainer {...props} />
}

export default MyContainer
