import httpServer from "@utils/http/server";
import { basePath } from "@constants/url";

export async function get(req, res) {
  const sessionID = req.query.s;
  req.session.extSessionId = sessionID;

  try {
    const { data } = await httpServer(req.session).post("/1.0/bind/check", {
      sessionID,
    });
    const {
      data: {
        state,
        backToStoreUri,
        backToStoreFailedUri,
        partnerName,
        customerNumber,
        editable,
        tnc,
        isRegister,
        name,
        email,
      },
      status,
    } = data;

    if (status === "00") {
      req.session.partnerName = partnerName;
      req.session.customerNumber = customerNumber;
      req.session.editable = editable;
      req.session.state = state;
      req.session.backToStoreUri = backToStoreUri;
      req.session.backToStoreFailedUri = backToStoreFailedUri;
      req.session.tnc = tnc;
      req.session.isRegister = isRegister;
      req.session.name = name;
      req.session.email = email;

      if (isRegister) {
        return redirectRegister(res, state);
      } else {
        return redirectExistUser(res, state);
      }
    }
  } catch (error) {
    console.process("errorHttp", error, req);
    res.writeHead(302, {
      location: `${basePath}/debit/error?code=992`,
    });
    res.end();
  }
}

function redirectExistUser(res, state) {
  let location = "";
  if (state === "BindingStateAgreement") {
    location = `${basePath}/debit/consent`;
  } else if (state === "BindingStateLogin") {
    location = `${basePath}/debit/otp`;
  } else if (state === "BindingStateVerified") {
    location = `${basePath}/debit/success`;
  } else {
    location = `${basePath}/debit/error?code=991`;
  }
  res.writeHead(302, {
    location,
  });
  res.end();
  return true;
}

function redirectRegister(res, state) {
  let location = "";
  if (state === "RegisterStateAgreement") {
    location = `${basePath}/debit/consent`;
  } else if (state === "RegisterStateOtpRequest") {
    location = `${basePath}/register/otp`;
  } else if (state === "RegisterStateOtpVerified") {
    location = `${basePath}/register/identity`;
  } else if (state === "RegisterStateRegistered") {
    location = `${basePath}/register/success`;
  } else {
    location = `${basePath}/register/error?code=991`;
  }

  res.writeHead(302, {
    location,
  });
  res.end();
  return true;
}