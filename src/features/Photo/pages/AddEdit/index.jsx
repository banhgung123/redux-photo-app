import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Banner from './../../../../components/Banner';
import PhotoForm from './../../components/PhotoForm';
import { addPhoto, updatePhoto } from './../../photoSlice';
import { randomNumber } from './../../../../utils/common';

AddEditPage.propTypes = {
    
};

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();
    const isAddMode = !photoId;
    // console.log(photoId);

    const editedPhoto = useSelector(state => state.photos.find(x => x.id === +photoId));

    const initialValues = isAddMode
        ? {
            title: '',
            categoryId: null,
            photo: ''
        }
        : editedPhoto;

    const handleSubmit = (values) => {
        console.log('Form submit: ', values);

        return new Promise(resolve => {
            setTimeout(() => {
                if (isAddMode) {
                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999)
                    };
                    const action = addPhoto(newPhoto);
                    dispatch(action);
                } else {
                    const action = updatePhoto(values);
                    dispatch(action);
                }
               
                history.push('/photos');
            }, 2000);
        });
    };

    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo" />

            <div className="photo-edit__form">
                <PhotoForm
                    isAddMode={isAddMode}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default AddEditPage;