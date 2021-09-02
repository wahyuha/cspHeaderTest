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

      if (state === "BindingStateAgreement") {
        res.writeHead(302, {
          location: `${basePath}/debit/consent`,
        });
        res.end();
        // res.redirect(302, `${basePath}/debit/consent`);
        // return false;
      } else if (state === "BindingStateLogin") {
        res.writeHead(302, {
          location: `${basePath}/debit/otp`,
        });
        res.end();
        // res.redirect(302, `${basePath}/debit/otp`);
        // return false;
      } else if (state === "BindingStateVerified") {
        res.writeHead(302, {
          location: `${basePath}/debit/success`,
        });
        res.end();
        // res.redirect(302, `${basePath}/debit/success`);
        // return false;
      }
      res.writeHead(302, {
        location: `${basePath}/debit/error?code=991`,
      });
      res.end();
      // res.redirect(302, `${basePath}/debit/error?code=991`);
      // return false;
    }
    res.writeHead(302, {
      location: `${basePath}/debit/error?code=${status}`,
    });
    res.end();
    // res.redirect(302, `${basePath}/debit/error?code=${status}`);
    // return false;
  } catch (error) {
    console.process(error);
    res.writeHead(302, {
      location: `${basePath}/debit/error?code=992`,
    });
    res.end();
    // res.redirect(302, `${basePath}/debit/error?code=992`);
    // return false;
  }
}
