export const createPlan = async (plan) => {
  const response = await fetch("/api/wizardPostApi", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const updatePlan = async (id, plan) => {
  const response = await fetch(`/api/wizardPutApi/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const updatePlan2 = async (id, plan) => {
  const response = await fetch(`/api/wizardPutApi2/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const planCalculations = async (id, plan) => {
  const response = await fetch(`/api/wizardCalculations/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const addScenario = async (id, plan) => {
  const response = await fetch(`/api/addNewScenario/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const addExpense = async (id, _expense) => {
  const response = await fetch(`/api/addExpense/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_expense),
  });
  return await response.json();
};

export const getPurchaseGoals = async (id) => {
  const response = await fetch(`/api/getPurchaseGoals/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  return await response.json();
};

export const updatePlanCalculations = async (id, plan) => {
  const response = await fetch(`/api/updatePlanCalculations/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const addDocuments = async (id, body) => {
  const response = await fetch(`/api/addDocuments/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body,
  });
  return await response.json();
};

export const downloadDocument = async (id, docType) => {
  const response = await fetch(
    `/api/downloadDocument/${id}?docType=${docType}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  return await response.json();
};

export const getPlans = async (queryParams) => {
  const query = new URLSearchParams(queryParams);
  const response = await fetch(`/api/getPlans?${query.toString()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`/api/createUser`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const updateLastStep = async (id, plan) => {
  const response = await fetch(`/api/updateLastStep/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const updatePhoneNumber = async (id, plan) => {
  const response = await fetch(`/api/updatePhoneNumber/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};


export const createTextMagicContact = async (id, plan) => {
  const response = await fetch(`/api/createTextMagicContact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};


export const createToken = async (id, plan) => {
  const response = await fetch(`/api/token/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const verifyToken = async (id, plan) => {
  const response = await fetch(`/api/verify/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  if (response.status >= 200 && response.status < 400) {
    console.log('====== success======')
    return await response.json();
  } else {
    console.log('coming in co errro r', response)
    throw new Error('code mismatch')
  }
};

export const verified = async (id) => {
  const response = await fetch(`/api/verified/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getTokenInfoCall = async (id) => {
  const response = await fetch(`/api/getTokenInfo/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};


// the id is not getting passed in here properly

/* Consolidate the code using something like this: 
  const sendRequest = async (url, method, body) => fetch(url, {
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body ? body: JSON.stringify(body): null
})

export const updatePlan2 = async (id, plan) => await sendRequest(`/api/wizardapi2/${id}`, 'PUT', plan)

export const planCalculations = async (id, plan) => await sendRequest(`/api/wizardcalculations/${id}`, 'POST', plan)

..etc */
