import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const SingleLineGridList = ({item_array}) => {
  const customStyle = useStyles();

  return(
    <div className={customStyle.root}>
      <GridList className={customStyle.gridList} cols={2}>
        {
          item_array.map(item => (
            <GridListTile key={item.img}>
              <img src={item.img} alt={item.title} />
              <GridListTileBar 
                title={item.title}
              />
            </GridListTile>
          ))
        }
      </GridList>
    </div>
  );

}

const SimpleSingleLineGridList = ({item_array, N = 1}) => {
  const customStyle = useStyles();

  return(
    <div className={customStyle.root}>
      <GridList className={customStyle.gridList} cols={N}>
        {
          item_array.length > 0 &&
          item_array.map(item => (
            <GridListTile key={item}>
              <img src={item} alt={item} />
            </GridListTile>
          ))
        }
      </GridList>
    </div>
  );

}

export { SingleLineGridList, SimpleSingleLineGridList }