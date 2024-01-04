import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({});

  const onSubmit = async (data) => {
    data.score = calculateScore(data);
    data.riskLevel = calculateRiskLevel(data.score);
    const catName = `${data.catName}`;
    data.catName = catName;
    await AssessmentService.submit({ assessment: data });
    console.log(`Assessment submitted`);
  };

  const instrumentType = [
    { id: 1, name: `Cat` },
    { id: 2, name: `Cat2` },
    { id: 3, name: `Cat3` },
  ];

  const calculateScore = (formData) => {
    let score = 0;
    score += formData.previousCatJudicialSystem ? 1 : 0;
    score += formData.physicalAltercationCat === `3+` ? 1 : 0;
    score += formData.physicalAltercationOwner === `10+` ? 1 : 0;
    score += formData.playWithDog ? 1 : 0;
    score += formData.hissesStranger ? 1 : 0;
    return score;
  };

  const calculateRiskLevel = (score) => {
    let riskLevel = `low`;
    if (score >= 0 && score <= 2) {
      riskLevel = `low`;
    } else
    if (score >= 3 && score <= 4) {
      riskLevel = `medium`;
    } else
    if (score >= 5 && score <= 6) {
      riskLevel = `high`;
    }
    return riskLevel;
  };

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Cat Assessment Info</h1>
    <h2>Instrument</h2>
    <select {...register(`instrumentType`)}>
      {instrumentType.map((type) =>
        <option key={type.id} value={type.id}>{type.name}</option>)};
    </select>

    <h1>Cat Details</h1> <br />
    <label htmlFor="catName">Cat Name:</label>
    <input type="text" placeholder="Cat Name" {...register(`catName`, { required: true })} />
    {errors.catName && <span>This field is required</span>}

    <label htmlFor="catDateOfBirth">Cat Date of Birth:</label>
    <input type="Date" placeholder="Cat Date of birth" {...register(`catDateOfBirth`, { required: true })} />
    {errors.catDateOfBirth && <span>This field is required</span>} <br />

    <h1>Questions & Responses</h1> <br />
    <div>
      <ol>
        <li>Contact with the Cat Judicial System</li>
        <div>
          <input type="radio" {...register(`contactCatJudicialSystem`)} value="no" />
          <label htmlFor="no">No</label> <br />

          <input type="radio" {...register(`contactCatJudicialSystem`)} value="yes" />
          <label htmlFor="yes">Yes</label>
        </div>
        <li>Physical altercations with other cats</li>
        <div>
          <input type="radio" {...register(`physicalAltercation`)} value="yes" />
          <label htmlFor="yes">0-3 altercations</label> <br />
          <input type="radio" {...register(`physicalAltercation`)} value="no" />
          <label htmlFor="no">3+ altercations</label>
        </div>
        <li>Physical altercations with owner</li>
        <div>
          <input type="radio" {...register(`pOwnerAltercation`)} value="yes" />
          <label htmlFor="yes">10+ altercations</label> <br />
          <input type="radio" {...register(`pOwnerAltercation`)} value="no" />
          <label htmlFor="no">0-10 altercations</label>
        </div>
        <li>Plays well with dogs</li>
        <div>
          <input type="radio" {...register(`playWithDog`)} value="no" />
          <label htmlFor="no">No</label> <br />
          <input type="radio" {...register(`playWithDog`)} value="yes" />
          <label htmlFor="yes">Yes</label>
        </div>
        <li>Hisses at strangers</li>
        <div>
          <input type="radio" {...register(`hissesStranger`)} value="yes" />
          <label htmlFor="yes">Yes</label> <br />
          <input type="radio" {...register(`hissesStranger`)} value="no" />
          <label htmlFor="no">No</label>
        </div>
      </ol>
    </div>
    <Button variant="primary" type="submit"> Submit</Button>
  </Form>;
};
