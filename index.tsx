import React from "react";
import { compose, pure } from "recompose";
import { withStyles, withTheme } from "material-ui";
import Card from "material-ui/Card";
import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import EditIcon from "react-icons/lib/md/edit";
import IconButton from "material-ui/IconButton";
import Avatar from "@common/Avatar";
import Title from "@common/typography/Title";
import Body from "@common/typography/Body";
import ResponsibleSection from "./ResponsibleSection"
import buildDetails from "./buildDetailsSection"
import cns from "classnames";

type OwnProps = {
    primaryContact?: string;
    cellPhone?: string;
    phone?: string;
    region?: string;
    city?: string;
    email?: string;
    raised?: boolean;
    imageUrl?: string;
    areas?: string[],
    lastContactDate?: Date;
    name: string;
    onCardClick?: (e: React.SyntheticEvent<any>) => any;
    onEdit?: (e: React.SyntheticEvent<any>) => any;
    responsibleName?: string;
    type: string,
    isTransparent?: boolean
};

type Props = OwnProps & {
    classes: any;
    theme: any;
};

const styles = theme => ({
    root: {
        marginBottom: 0,
        transition: theme.transitions.create("all"),
        "& > *:last-child": {
            padding: theme.spacing.unit * 2,
            paddingRight: 0,
        }
    },
    transparent: {
        backgroundColor: "transparent",
    },
    onHover: {
        "&:hover, &:active": {
            boxShadow: theme.shadows[8]
        }
    },
    flat: {
        boxShadow: "none"
    },
    grid: {
        padding: theme.spacing.unit
    },
    infoCell: {
        flex: 1,
        padding: theme.spacing.unit,
        paddingRight: 0,

        "& > div > div:first-child": {
            flex: "1 0 0"
        }
    },
    divider: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    editButton: {
        "&:hover, &:active": {
            color: theme.palette.common.black,
            transition: theme.transitions.create("all")
        }
    },
    searchCard: {
        marginBottom: theme.spacing.unit * 3,
        cursor: "pointer"
    },
    desc: {
        color: theme.palette.common.color,
        marginTop: theme.spacing.unit
    }
});

export const ProfileHeader: React.SFC<Props> = ({ classes, ...props }) => {
    const { name, areas, city, onEdit, onCardClick, raised, isTransparent, responsibleName } = props;
    const stringAreas = areas ? areas.join(", ").trim() : "";
    const desc = `${city} ${stringAreas}`.trim();
    const details = buildDetails(props);

    const cardClasses = cns(classes.root, {
        [classes.onHover]: Boolean(onCardClick),
        [classes.flat]: !raised,
        [classes.searchCard]: !onEdit,
        [classes.transparent]: isTransparent
    });
    return (
        <Card className={cardClasses} onClick={onCardClick}>
            <Grid container item spacing={0} className={classes.grid}>
                <Grid item>
                    <Avatar name={name} size="big" />
                </Grid>

                <Grid item container spacing={0} direction="column" className={classes.infoCell}>
                    <Grid item container spacing={0}>
                        <Grid item container direction="column" spacing={0}>
                            <Grid item>
                                <Title>{name || "Default name"}</Title>
                            </Grid>
                            <Grid item className={classes.desc}>
                                <Body>{desc || ""}</Body>
                            </Grid>
                        </Grid>

                        {onEdit
                            ? <Grid item>
                                <Grid item>
                                    <IconButton
                                        className={classes.editButton}
                                        onClick={e => {
                                            e.stopPropagation();
                                            onEdit(e);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            : <ResponsibleSection responsibleName={responsibleName} />
                        }
                    </Grid>

                    {name && <Divider className={classes.divider} />}
                    {details}
                </Grid>
            </Grid>
        </Card>
    );
};

ProfileHeader.defaultProps = {
    raised: true
};

export default compose<Props, OwnProps>(pure, withStyles(styles), withTheme())(ProfileHeader);
