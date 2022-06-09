import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import { useParams } from "react-router-dom";
import gymService from "../../services/GymService";
import { Carousel } from "react-responsive-carousel";
import GymViewMap from "../../Components/mapShow/mapShow";
import { template } from "lodash";
import StripeContainer from "../../Components/Stripe/StripeContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const GymDescription = () => {
  const reviewSchema = yup.object().shape({
    rating: yup.string().required("rating can't be empty"),
    comment: yup
      .string()
      .min(10, "Comment must be at least 10 characters!")
      .required("Comment can't be empty"),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const gymId = useParams();
  const [pins, SetPins] = useState([31.4878, 74.3646]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showItem, setShowItem] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  var order = {
    user_id: userService.getLoggedInUser()._id,
    gym_id: gymId.id,
  };
  const [orderX, SetOrderX] = useState({
    user_id: "",
    gym_id: "",
    price: 0,
    time_date: new Date().getTime(),
  });
  const {
    register: controlReview,
    handleSubmit: handleSubmitReview,
    formState: { errors: errorsReview },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  const submitReviewForm = (data) => {

    console.log("Submit Review")
    var tempObject = {
      user_id: userService.getLoggedInUser()._id,
      rating: data.rating,
      comment: data.comment,
    };

    console.log(tempObject)

    gymService
      .post_gym_review(gymId.id,tempObject)
      .then((data) => {
        console.log(data);
        setEditModalOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleBuyMembership() {
    console.log("Buy Membership");
    console.log(orderX);
    gymService
      .buy_gym_membership(orderX)
      .then((data) => {
        console.log(data);
        checkGymOrder(order);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkGymOrder(order) {
    gymService
      .check_gym_membership(order.user_id, order.gym_id)
      .then((data) => {
        setShowItem(false);
      })
      .catch((err) => {
        console.log(err);
        setShowItem(true);
      });
  }

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "trainer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    getGym();
    checkGymOrder(order);
  }, []);
  const [gymDetails, setGymDetails] = useState({
    user_id: { full_name: "", email: "" },
    gym_membership_price: 0,
    gender_facilitation: "",
    gym_desc: "",
    gym_contact_no: "",
    location: {
      address: "",
      city: "",
      state: "",
    },
    gym_photos: [{ photo_url: "" }],
  });
  function getGym() {
    gymService.get_one_gym(gymId.id).then((data) => {
      SetOrderX({
        user_id: userService.getLoggedInUser()._id,
        gym_id: gymId.id,
        price: data.crud.gym_membership_price,
        time_date: new Date().getTime(),
      });
      setGymDetails(data.crud);
      var temp = [data.crud.cordinates.lat, data.crud.cordinates.long];
      SetPins(temp);
    });
  }

  return (
    <div className="page-container-user">
      <TopBar />
      <SideMenu />
      <Button
        className="m-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i class="bx bx-arrow-back m-1"></i> Back
      </Button>
      <h2>Gym Description</h2>
      <div className="d-flex">
        <div className="gym-desc d-flex flex-column ">
          <div className="slider-div d-flex justify-content-center p-5">
            <Carousel width="100%">
              {gymDetails.gym_photos.length == 0 ? (
                <h2>No photos</h2>
              ) : (
                gymDetails.gym_photos.map((e, index) => {
                  return (
                    <div key={index}>
                      <img src={e.photo_url} height="200" />
                    </div>
                  );
                })
              )}
            </Carousel>
          </div>
          {/* <img src={gymDetails.gym_photos?.photo_url} alt="" /> */}
          <h4>{gymDetails.user_id.full_name}</h4>
          <h4>Membership Price:{gymDetails.gym_membership_price}</h4>
          <h4>Gender:{gymDetails.gender_facilitation}</h4>
          <p>{gymDetails.gym_desc}</p>
        </div>
        <div className="gym-contact d-flex flex-column ">
          <div>
            {showItem ? (
              <div>
                <div className="modal-container">
                  <Modal
                    style={{
                      overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,

                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      },
                      content: {
                        color: "white",
                        position: "absolute",
                        top: "40px",
                        left: "40px",
                        right: "40px",
                        bottom: "40px",
                        background: "rgba(0,30,60,1)",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "1rem",
                        outline: "none",
                        padding: "20px",
                      },
                    }}
                    className="modal-x w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                    isOpen={confirmDelete}
                    onRequestClose={() => {
                      setConfirmDelete(false);
                    }}
                  >
                    <div className="modal-inner w-75 d-flex flex-column">
                      <a
                        onClick={() => {
                          setConfirmDelete(false);
                        }}
                      >
                        <i class="bx bx-x"></i>
                      </a>
                      <StripeContainer
                        amount={gymDetails.gym_membership_price}
                        action={handleBuyMembership}
                        description="Gym Membership Payment"
                      />
                    </div>
                  </Modal>
                </div>
                <Button
                  className="w-50 m-3"
                  onClick={() => setConfirmDelete(true)}
                >
                  Buy Membership
                </Button>
              </div>
            ) : (
              <p className="text-success">You are a Member</p>
            )}
          </div>
          <div>
            <Button
              className="m-2 btn-warning"
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              Review plan
            </Button>
            <div className="modal-container">
              <Modal
                style={{
                  overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  },
                  content: {
                    color: "white",
                    position: "absolute",
                    top: "40px",
                    left: "40px",
                    right: "40px",
                    bottom: "40px",
                    background: "rgba(0,30,60,1)",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "1rem",
                    outline: "none",
                    padding: "20px",
                  },
                }}
                className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
                isOpen={editModalOpen}
                onRequestClose={() => {
                  setEditModalOpen(false);
                }}
              >
                <div className="modal-inner w-75 d-flex flex-column">
                  <a
                    onClick={() => {
                      setEditModalOpen(false);
                    }}
                  >
                    <i class="bx bx-x"></i>
                  </a>

                  <div className="query-box mt-3 d-flex flex-column align-items-left">
                    <form
                      onSubmit={handleSubmitReview(submitReviewForm)}
                      className="d-flex flex-column"
                    >
                      <label for="fname">Select rating</label>
                      <FormControl className="m-3 w-100 dropdown-trainer">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="rating"
                          {...controlReview("rating")}
                          defaultValue="5"
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                        </Select>
                      </FormControl>
                      <p>{errorsReview.rating?.message}</p>
                      <label for="">Comment</label>
                      <textarea
                        className="text-field mt-2"
                        name="comment"
                        {...controlReview("comment")}
                      />
                      <p>{errorsReview.comment?.message}</p>
                      <Button className="w-50" type="submit ">
                        Submit review
                      </Button>
                    </form>
                  </div>
                </div>
                <div></div>
              </Modal>
            </div>
          </div>
          <h4>Contact No.</h4>
          <p>{gymDetails.gym_contact_no}</p>
          <h4>Email</h4>
          <p>{gymDetails.user_id.email}</p>
          <h4>Location</h4>
          <p>{gymDetails.location.address + ", " + gymDetails.location.city}</p>
          <div className="mt-3 custom-map">
            <GymViewMap mapPin={pins} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDescription;
