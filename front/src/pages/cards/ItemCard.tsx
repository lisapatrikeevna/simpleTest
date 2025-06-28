import type {CardType} from "../../bll/cards/cards.type"
import cl from './Cards.module.scss'
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../router";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme}) => ({
    marginLeft: 'auto', transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }), variants: [{
        props: ({expand}) => !expand, style: {
            transform: 'rotate(0deg)',
        },
    }, {
        props: ({expand}) => !!expand, style: {
            transform: 'rotate(180deg)',
        },
    },],
}));

type propsType = {
    card: CardType
}
const ItemCard = ({card}: propsType) => {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleNavigate = () => navigate(PATH.innerCard, {state: {id: card.id}})



    return (<Card className={cl.cardWrap} onClick={handleNavigate}>
        <CardHeader avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R</Avatar>}
            action={<IconButton aria-label="settings"><MoreVertIcon/></IconButton>}
            title={card.title.split(' ')[0]}
            subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" alt="Paella dish"
                   image='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
        />
        <CardContent>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                {card.title}
            </Typography>
        </CardContent>
        <CardActions disableSpacing onClick={(e) => e.stopPropagation()}>

            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon/>
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography sx={{marginBottom: 2}}>Method:</Typography>
                <Typography sx={{marginBottom: 2}}>
                    {card.body}
                </Typography>
            </CardContent>
        </Collapse>
    </Card>);
};

export default ItemCard;